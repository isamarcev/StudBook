// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract StudentAchievements is ERC721, Ownable {
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

    // Updated Submission struct using SubmissionStatus.
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
    
    uint256[] public projectIds;  // All projects list
    function getAllProjects() external view returns (uint256[] memory) {
        return projectIds;
    }

    mapping(uint256 => Project) public projects;
    mapping(uint256 => Submission) public submissions;
    
    mapping(address => uint256[]) public Verifiers;  
    mapping(address => uint256[]) public InstructorProjectIds;  
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
    // Updated event includes the new status.
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

        // Добавляем `projectId` в список проектов инструктора
        InstructorProjectIds[msg.sender].push(newProjectId);

        // Добавляем `projectId` в список проектов для каждого верификатора
        for (uint256 i = 0; i < _verifiers.length; i++) {
            Verifiers[_verifiers[i]].push(newProjectId);
        }

        emit ProjectCreated(newProjectId, _name, msg.sender);

        return newProjectId;
    }

    function submitAchievement(uint256 _projectId, string memory _description) external returns (uint256) {
        require(
            projects[_projectId].creator != address(0),
            "Project does not exist"
        );
        require(
            block.timestamp <= projects[_projectId].deadline,
            "Project deadline passed"
        );
        // instructor can not create submission 
        require(isInstructor[msg.sender], "Not an instructor");
        
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

    // Updated verifySubmission accepts a boolean to determine approval or rejection.
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
        // If verifier was not set - setup
        if (submission.verifier == address(0)) {
            submission.verifier = msg.sender;
        }
        if (approve) {
            submission.status = SubmissionStatus.Approved;
            // Optionally mint an NFT certificate for an approved submission.
            _mint(submission.student, _submissionId);
        } else {
            submission.status = SubmissionStatus.Rejected;
        }

        emit SubmissionStatusUpdated(
            _submissionId,
            msg.sender,
            submission.status
        );
    }

    // New getter to retrieve the status of a submission.
    function getSubmissionStatus(uint256 _submissionId)
        external
        view
        returns (SubmissionStatus)
    {
        require(
            submissions[_submissionId].student != address(0),
            "Submission does not exist"
        );
        return submissions[_submissionId].status;
    }

    // Getter to retrieve all submission IDs for a specific user.
    function getUserSubmissions(address _user)
        external
        view
        returns (uint256[] memory)
    {
        return submissionsByUser[_user];
    }

    // getter for get all list submission by address
    // Getter to retrieve all submission details by the project creator's address
    function getSubmissionsByCreator(address _creator) external view returns (Submission[] memory) {
    // Initialize an array to hold all submissions by the creator
    uint256[] memory creatorProjectIds = InstructorProjectIds[_creator];
    uint256 totalSubmissions = 0;

    // Count the total number of submissions by the creator
    for (uint256 i = 0; i < creatorProjectIds.length; i++) {
        totalSubmissions += projects[creatorProjectIds[i]].submissions.length;
    }

    // Create an array to store all the submissions
    Submission[] memory allSubmissions = new Submission[](totalSubmissions);
    uint256 index = 0;

    // Iterate over each project created by the instructor
    for (uint256 i = 0; i < creatorProjectIds.length; i++) {
        uint256 projectId = creatorProjectIds[i];
        Project storage project = projects[projectId];
        
        // Iterate over all submissions in the project
        for (uint256 j = 0; j < project.submissions.length; j++) {
            uint256 submissionId = project.submissions[j];
            allSubmissions[index] = submissions[submissionId];
            index++;
        }
    }

    return allSubmissions;
}

    function getSubmissionDetails(uint256 _submissionId) external view returns (
        address student,
        uint256 projectId,
        SubmissionStatus status,
        string memory projectName,
        string memory projectDescription
) {
    require(submissions[_submissionId].student != address(0), "Submission does not exist");

    Submission memory submission = submissions[_submissionId];
    Project memory project = projects[submission.projectId];

    return (
        submission.student,
        submission.projectId,
        submission.status,
        project.name,
        project.description
    );
}
}
