// ************************************************************//
//                         UserModel
// ************************************************************//

class UserModel {
    constructor(userId, fullName, email, userType) {
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.userType = userType;
    }

    login() {
        console.log(`${this.fullName} logged in.`);
    }

    logout() {
        console.log(`${this.fullName} logged out.`);
    }
}

// ************************************************************//
//                      ApplicantModel
// ************************************************************//

class ApplicantModel extends UserModel {
    constructor(userId, fullName, email) {
        super(
            userId,
            fullName,
            email,
            "Applicant"
        );
    }
}

// ************************************************************//
//                      RecruiterModel
// ************************************************************//

class RecruiterModel extends UserModel {
    constructor(userId, fullName, email) {
        super(
            userId,
            fullName,
            email,
            "Recruiter"
        );
    }
}

// ************************************************************//
//                     InterviewerModel
// ************************************************************//

class InterviewerModel extends UserModel {
    constructor(userId, fullName, email) {
        super(
            userId,
            fullName,
            email,
            "Interviewer"
        );
    }
}

// ************************************************************//
//                   ApplicantArrayModel
// ************************************************************//

class ApplicantArrayModel {
    constructor() {
        this.applicants = [];
    }

    addApplicant(userId, fullName, email) {

        const exists = this.applicants.some(
            applicant => applicant.userId === userId
        );

        if (exists) {
            throw new Error("Applicant ID already exists.");
        }

        const applicant = new ApplicantModel(
            userId,
            fullName,
            email
        );

        this.applicants.push(applicant);

        return applicant;
    }

    removeApplicant(userId) {

        const index = this.applicants.findIndex(
            applicant => applicant.userId === userId
        );

        if (index === -1) {
            throw new Error("Applicant not found.");
        }

        this.applicants.splice(index, 1);
    }

    findApplicant(userId) {
        return this.applicants.find(
            applicant => applicant.userId === userId
        );
    }

    getApplicants() {
        return this.applicants;
    }
}

// ************************************************************//
//                   RecruiterArrayModel
// ************************************************************//

class RecruiterArrayModel {
    constructor() {
        this.recruiters = [];
    }

    addRecruiter(userId, fullName, email) {

        const exists = this.recruiters.some(
            recruiter => recruiter.userId === userId
        );

        if (exists) {
            throw new Error("Recruiter ID already exists.");
        }

        const recruiter = new RecruiterModel(
            userId,
            fullName,
            email
        );

        this.recruiters.push(recruiter);

        return recruiter;
    }

    removeRecruiter(userId) {

        const index = this.recruiters.findIndex(
            recruiter => recruiter.userId === userId
        );

        if (index === -1) {
            throw new Error("Recruiter not found.");
        }

        this.recruiters.splice(index, 1);
    }

    findRecruiter(userId) {
        return this.recruiters.find(
            recruiter => recruiter.userId === userId
        );
    }

    getRecruiters() {
        return this.recruiters;
    }
}

// ************************************************************//
//                  InterviewerArrayModel
// ************************************************************//

class InterviewerArrayModel {
    constructor() {
        this.interviewers = [];
    }

    addInterviewer(userId, fullName, email) {

        const exists = this.interviewers.some(
            interviewer => interviewer.userId === userId
        );

        if (exists) {
            throw new Error("Interviewer ID already exists.");
        }

        const interviewer = new InterviewerModel(
            userId,
            fullName,
            email
        );

        this.interviewers.push(interviewer);

        return interviewer;
    }

    removeInterviewer(userId) {

        const index = this.interviewers.findIndex(
            interviewer => interviewer.userId === userId
        );

        if (index === -1) {
            throw new Error("Interviewer not found.");
        }

        this.interviewers.splice(index, 1);
    }

    findInterviewer(userId) {
        return this.interviewers.find(
            interviewer => interviewer.userId === userId
        );
    }

    getInterviewers() {
        return this.interviewers;
    }
}


// ************************************************************//
//                     JobVacancyModel
// ************************************************************//

class JobVacancyModel {

    constructor(
        vacancyId,
        recruiterId,
        recruiterName,
        positionTitle,
        department,
        description,
        openingDate,
        closingDate
    ) {

        this.vacancyId = vacancyId;

        this.recruiterId = recruiterId;

        this.recruiterName = recruiterName;

        this.positionTitle = positionTitle;

        this.department = department;

        this.description = description;

        this.openingDate = openingDate;

        this.closingDate = closingDate;
    }

    getStatus() {

        const today = new Date();

        const openingDate =
            new Date(this.openingDate);

        const closingDate =
            new Date(this.closingDate);

        if (today < openingDate) {
            return "Upcoming";
        }

        if (
            today >= openingDate &&
            today <= closingDate
        ) {
            return "Open";
        }

        return "Closed";
    }

}

    

// ************************************************************//
//                   JobVacancyArrayModel
// ************************************************************//



class JobVacancyArrayModel {



    constructor() {
        this.jobVacancies = [];
    }

    addJobVacancy(
        vacancyId,
        recruiterId,
        recruiterName,
        positionTitle,
        department,
        description,
        openingDate,
        closingDate
    ) {

        const exists = this.jobVacancies.some(
            vacancy =>
                vacancy.vacancyId === vacancyId
        );

        if (exists) {
            throw new Error(
                "Vacancy ID already exists."
            );
        }

        const vacancy =
            new JobVacancyModel(
                vacancyId,
                recruiterId,
                recruiterName,
                positionTitle,
                department,
                description,
                openingDate,
                closingDate
            );

        this.jobVacancies.push(vacancy);

        return vacancy;
    }


// ************************************************************//
//                  Remove Job Vacancy
// ************************************************************//

    removeJobVacancy(vacancyId) {

        const index =
            this.jobVacancies.findIndex(
                vacancy =>
                    vacancy.vacancyId === vacancyId
            );

        if (index === -1) {
            throw new Error(
                "Job Vacancy not found."
            );
        }

        this.jobVacancies.splice(index, 1);
    }

    getJobVacancies() {
        return this.jobVacancies;
    }

    // ************************************************************//
    //                  Find Job Vacancy
    // ************************************************************//

    findJobVacancy(vacancyId) {

        return this.jobVacancies.find(
        vacancy =>
            vacancy.vacancyId === vacancyId
        );

    }


}

// ************************************************************//
//                     ApplicationModel
// ************************************************************//

class ApplicationModel {

    constructor(
        applicationId,
        applicantId,
        applicantName,
        vacancyId,
        vacancyTitle,
        applicationLetter
    ) {

        this.applicationId =
            applicationId;

        this.applicantId =
            applicantId;

        this.applicantName =
            applicantName;

        this.vacancyId =
            vacancyId;

        this.vacancyTitle =
            vacancyTitle;

        this.applicationLetter =
            applicationLetter;

        this.applicationDate =
        new Date();

        this.status =
            "Pending";
    }
}

// ************************************************************//
//                  ApplicationArrayModel
// ************************************************************//



class ApplicationArrayModel {

    constructor() {
        this.applications = [];
    }

    addApplication(
        applicationId,
        applicantId,
        applicantName,
        vacancyId,
        vacancyTitle,
        applicationLetter
    ) {
        const exists =
        this.applications.some(
        application =>

            application.applicantId
                === applicantId

            &&

            application.vacancyId
                === vacancyId
        );

        if (exists) {

            throw new Error(
                "Applicant has already applied for this vacancy."
                );

            }

        const application =
            new ApplicationModel(
                applicationId,
                applicantId,
                applicantName,
                vacancyId,
                vacancyTitle,
                applicationLetter
            );

        this.applications.push(
            application
        );

        return application;
    }

    getApplications() {
        return this.applications;
    }

    removeApplication(
        applicationId
    ) {

        const index =
            this.applications.findIndex(
                application =>
                    application.applicationId
                        === applicationId
            );

        if (index === -1) {
            throw new Error(
                "Application not found."
            );
        }

        this.applications.splice(
            index,
            1
        );
    }

    hasApplicationsForVacancy(
        vacancyId
    ){
        return this.applications.some(
            application => application.vacancyId === vacancyId
        );
    }

// In UserModel.js

// 1. Get applications submitted ONLY for vacancies published by this recruiter
    getApplicationsByRecruiterId(recruiterId) {
    const recruiterVacancyIds = this.vacancies
        .filter(vacancy => vacancy.recruiterId === recruiterId)
        .map(vacancy => vacancy.vacancyId);

    return this.applications.filter(app => recruiterVacancyIds.includes(app.vacancyId));
    }

// 2. Update status and optional notes for a specific application
    updateApplicationStatus(applicationId, newStatus, feedbackNotes = '') {
    const application = this.applications.find(app => app.applicationId === applicationId);
    if (application) {
        application.status = newStatus;
        if (feedbackNotes) {
            application.feedback = feedbackNotes;
        }
        return true;
    }
    return false;
    }

    // 3. Helper to fetch a single application by ID
    getApplicationById(applicationId) {
    return this.applications.find(app => app.applicationId === applicationId);
    }

// Inside UserModel.js

addJobVacancy(vacancy) {
    // Check if vacancy ID already exists
    const exists = this.vacancies.some(v => v.vacancyId === vacancy.vacancyId);
    if (exists) {
        return false;
    }
    this.vacancies.push(vacancy);
    return true;
}



}

