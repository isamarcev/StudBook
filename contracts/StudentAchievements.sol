// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract StudentAchievements is ERC721, Ownable {
    using Counters for Counters.Counter;
    
    struct Project {
        string name;
        string description;
        address creator;
        bool isActive;
    }
    
    struct Submission {
        address student;
        uint projectId;
        bool verified;
    }
    
    Counters.Counter private _projectIds;
    Counters.Counter private _tokenIds;
    mapping(uint => Project) public projects;
    mapping(uint => Submission) public submissions;
    mapping(address => bool) public isInstructor;
    
    event ProjectCreated(uint indexed projectId, string name, address creator);
    event SubmissionMade(uint indexed submissionId, address student, uint projectId);
    event SubmissionVerified(uint indexed submissionId, address instructor);
    
    constructor() ERC721("StudentNFT", "SNFT") Ownable(msg.sender) {}
    
    modifier onlyInstructor() {
        require(isInstructor[msg.sender], "Not an instructor");
        _;
    }
    
    function addInstructor(address instructor) external onlyOwner {
        isInstructor[instructor] = true;
    }
    
    function createProject(string memory name, string memory description) external onlyInstructor {
        _projectIds.increment();
        uint projectId = _projectIds.current();
        projects[projectId] = Project(name, description, msg.sender, true);
        emit ProjectCreated(projectId, name, msg.sender);
    }
    
    function submitWork(uint projectId) external {
        require(projects[projectId].isActive, "Project not active");
        _tokenIds.increment();
        uint submissionId = _tokenIds.current();
        submissions[submissionId] = Submission(msg.sender, projectId, false);
        emit SubmissionMade(submissionId, msg.sender, projectId);
    }
    
    function verifySubmission(uint submissionId) external onlyInstructor {
        require(!submissions[submissionId].verified, "Already verified");
        submissions[submissionId].verified = true;
        _mint(submissions[submissionId].student, submissionId);
        emit SubmissionVerified(submissionId, msg.sender);
    }
}
