// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract StudentAchievements is Ownable {
    using Counters for Counters.Counter;

    // New enum for submission status.
    enum SubmissionStatus {
        Waiting,
        Approved,
        Rejected
    }

    struct Project {
        uint256 projectId;
        string name;
        string description;
        address creator;
        address[] whitelist;
        uint256 deadline;
        address[] verifiers;
        uint256 reward;
        uint256[] submissions;
    }

    struct Submission {
        address student;
        uint256 projectId;
        string description;
        SubmissionStatus status;
        address verifier;
        string verdict;
    }

    Counters.Counter private _projectIds;
    Counters.Counter private _submissionIds;

    uint256[] public projectIds; // All projects list
    function getAllProjects() external view returns (uint256[] memory) {
        return projectIds;
    }

    mapping(uint256 => Project) public projects;
    mapping(uint256 => Submission) public submissions;

    mapping(address => uint256[]) public verifiers;
    mapping(address => uint256[]) public instructorProjectIds;
    mapping(address => uint256[]) public submissionsByUser;

    mapping(address => bool) public isInstructor;

    event ProjectCreated(
        uint256 indexed projectId,
        string name,
        address creator
    );
    event SubmissionMade(
        uint256 indexed submissionId,
        address indexed student,
        uint256 projectId
    );
    event SubmissionStatusUpdated(
        uint256 indexed submissionId,
        address verifier,
        SubmissionStatus status
    );

    constructor() ERC721("StudentNFT", "SNFT") Ownable(msg.sender) {}

    modifier onlyInstructor() {
        require(isInstructor[msg.sender], "Not an instructor");
        _;
    }

    function addInstructor(address instructor) external onlyOwner {
        isInstructor[instructor] = true;
    }

    function createProject(
        string memory _name,
        string memory _description,
        address[] memory _whitelist,
        uint256 _deadline,
        address[] memory _verifiers,
        uint256 _reward
    ) external onlyInstructor returns (uint256) {
        require(_deadline > block.timestamp, "Deadline must be in the future");

        _projectIds.increment();
        uint256 newProjectId = _projectIds.current();

        projects[newProjectId] = Project({
            projectId: newProjectId,
            name: _name,
            description: _description,
            creator: msg.sender,
            whitelist: _whitelist,
            deadline: _deadline,
            verifiers: _verifiers,
            reward: _reward,
            submissions: new uint256[](0)
        });

        instructorProjectIds[msg.sender].push(newProjectId);

        for (uint256 i = 0; i < _verifiers.length; i++) {
            verifiers[_verifiers[i]].push(newProjectId);
        }

        emit ProjectCreated(newProjectId, _name, msg.sender);

        return newProjectId;
    }

    function submitAchievement(
        uint256 _projectId,
        string memory _description
    ) external returns (uint256) {
        require(
            projects[_projectId].creator != address(0),
            "Project does not exist"
        );
        require(
            block.timestamp <= projects[_projectId].deadline,
            "Project deadline passed"
        );
        // instructor can not create submission
        require(
            !isInstructor[msg.sender],
            "Instructor cannot submit achievement"
        );

        // check max length
        require(bytes(_description).length <= 300, "Description too long");
        // If a whitelist is provided, ensure the sender is allowed.
        if (projects[_projectId].whitelist.length > 0) {
            bool allowed = false;
            for (
                uint256 i = 0;
                i < projects[_projectId].whitelist.length;
                i++
            ) {
                if (projects[_projectId].whitelist[i] == msg.sender) {
                    allowed = true;
                    break;
                }
            }
            require(allowed, "You are not whitelisted for this project");
        }

        _submissionIds.increment();
        uint256 newSubmissionId = _submissionIds.current();

        submissions[newSubmissionId] = Submission({
            student: msg.sender,
            projectId: _projectId,
            status: SubmissionStatus.Waiting,
            verifier: address(0),
            description: _description,
            verdict: ""
        });

        // Record the submission ID for the student.
        submissionsByUser[msg.sender].push(newSubmissionId);

        emit SubmissionMade(newSubmissionId, msg.sender, _projectId);
        return newSubmissionId;
    }

    function verifySubmission(uint256 _submissionId, bool approve) external {
        Submission storage submission = submissions[_submissionId];
        require(submission.student != address(0), "Submission does not exist");
        require(
            submission.status == SubmissionStatus.Waiting,
            "Submission already processed"
        );

        Project storage project = projects[submission.projectId];

        // Check if the caller is the project creator.
        bool isAuthorized = (msg.sender == project.creator);

        // Or check if the caller is in the project's verifiers list.
        if (!isAuthorized) {
            for (uint256 i = 0; i < project.verifiers.length; i++) {
                if (project.verifiers[i] == msg.sender) {
                    isAuthorized = true;
                    break;
                }
            }
        }
        require(isAuthorized, "Not authorized to verify this submission");
        if (submission.verifier == address(0)) {
            submission.verifier = msg.sender;
        }
        if (approve) {
            submission.status = SubmissionStatus.Approved;
        } else {
            submission.status = SubmissionStatus.Rejected;
        }

        emit SubmissionStatusUpdated(
            _submissionId,
            msg.sender,
            submission.status
        );
    }

    // Getter to retrieve all submission IDs for a specific user.
    function getUserSubmissions(
        address _user
    ) external view returns (Submission[] memory) {
        uint256[] memory userSubmissionIds = submissionsByUser[_user];
        Submission[] memory userSubmissions = new Submission[](
            userSubmissionIds.length
        );

        for (uint256 index = 0; index < userSubmissionIds.length; index++) {
            uint256 submissionId = userSubmissionIds[index];
            Submission storage submission = submissions[submissionId];
            if (submission.student == _user) {
                userSubmissions.push(submission);
            }
        }

        return userSubmissions;
    }
}
