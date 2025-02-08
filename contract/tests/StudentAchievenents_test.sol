// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "remix_tests.sol";
import "../contracts/StudentAchievements.sol";

contract StudentAchievementsTest {
    StudentAchievements contractInstance;
    address instructor = address(0x123);
    address student = address(0x456);

    function beforeAll() public {
        contractInstance = new StudentAchievements();
        contractInstance.addInstructor(address(this));
    }

    function testCreateProject() public {
        contractInstance.createProject("Blockchain Course", "Learn Solidity", new address[](0), block.timestamp + 1 days, new address[](0) , 100);
        (uint256 id, string memory name,,,,) = contractInstance.projects(1);
        Assert.equal(id, 1, "Project ID should be 1");
        Assert.equal(name, "Blockchain Course", "Project name should match");
    }

    function testSubmitAchievement() public {
        contractInstance.submitAchievement(1);
        (address studentAddr,, StudentAchievements.SubmissionStatus status) = contractInstance.submissions(1);
        Assert.equal(studentAddr, address(this), "Submission should belong to sender");
        Assert.equal(uint(status), uint(StudentAchievements.SubmissionStatus.Waiting), "Status should be Waiting");
    }

    function testVerifySubmission() public {
        contractInstance.verifySubmission(1, true);
        (, , StudentAchievements.SubmissionStatus status) = contractInstance.submissions(1);
        Assert.equal(uint(status), uint(StudentAchievements.SubmissionStatus.Approved), "Status should be Approved");
    }
}
