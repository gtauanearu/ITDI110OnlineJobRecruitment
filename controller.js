// ************************************************************//
//                      UserController
// ************************************************************//

class UserController {

    constructor(view) {

        this.view = view;

        this.applicantModel =
            new ApplicantArrayModel();

        this.recruiterModel =
            new RecruiterArrayModel();

        this.interviewerModel =
            new InterviewerArrayModel();

        this.jobVacancyModel =
            new JobVacancyArrayModel();

        this.applicationModel =
            new ApplicationArrayModel();


        this.initializeEvents();
        this.initEventListeners()
    }

// Inside UserController.js

initEventListeners() {
    // Inside UserController.js -> initEventListeners()

if (this.view.applicantRecords) { // or the container listening for applicant card events
    this.view.applicantRecords.addEventListener('click', (event) => {
        const target = event.target;

        // ... existing click listeners (e.g. apply-for-job-btn, submit-application-btn) ...

        // Listen for the Cancel Application button
        if (target.classList.contains('cancel-application-btn')) {
            const applicantId = target.dataset.id;
            this.view.hideApplicationForm(applicantId);
        }
    });
}

    // Existing listeners ...

    if (this.view.recruiterContainer) {
        this.view.recruiterContainer.addEventListener('click', (event) => {
            const target = event.target;

            // 1. Open Assessment Form
            if (target.classList.contains('assess-applications-btn')) {
                const recruiterId = target.dataset.id;
                this.handleOpenAssessmentForm(recruiterId);
            }

            // 2. Save Assessment Decision
            if (target.classList.contains('submit-assessment-btn')) {
                const recruiterId = target.dataset.id;
                this.handleSaveAssessment(recruiterId);
            }

            // 3. Cancel Assessment View
            if (target.classList.contains('cancel-assessment-btn')) {
                const recruiterId = target.dataset.id;
                this.view.hideInlineAssessmentForm(recruiterId);
            }
        });
    }
    

    // 1. Open Vacancy Form
        if (target.classList.contains('create-vacancy-btn')) {
            const recruiterId = target.dataset.id;
            const recruiterName = target.dataset.name;
            this.view.showVacancyForm(recruiterId, recruiterName);
        }

        // 2. Publish Vacancy
        if (target.classList.contains('publish-vacancy-btn')) {
            const recruiterId = target.dataset.id;
            this.handlePublishVacancy(recruiterId);
        }

        // 3. Cancel Vacancy Form
        if (target.classList.contains('cancel-vacancy-btn')) {
            const recruiterId = target.dataset.id;
            this.view.hideVacancyForm(recruiterId);
        }

}

handleOpenAssessmentForm(recruiterId) {
    // Fetch only applications belonging to vacancies created by this recruiter
    const recruiterApplications = this.model.getApplicationsByRecruiterId(recruiterId);
    this.view.showInlineAssessmentForm(recruiterId, recruiterApplications);
}

handleSaveAssessment(recruiterId) {
    const appIdSelect = document.getElementById(`assessmentAppSelect-${recruiterId}`);
    const statusSelect = document.getElementById(`assessmentStatusSelect-${recruiterId}`);
    const notesInput = document.getElementById(`assessmentNotesInput-${recruiterId}`);

    if (!appIdSelect || !appIdSelect.value) {
        this.view.showUserStatusMessage("No application selected to assess.", true);
        return;
    }

    const applicationId = appIdSelect.value;
    const newStatus = statusSelect.value;
    const feedbackNotes = notesInput ? notesInput.value.trim() : "";

    const isUpdated = this.model.updateApplicationStatus(applicationId, newStatus, feedbackNotes);

    if (isUpdated) {
        this.view.showUserStatusMessage(`Application ${applicationId} status updated to '${newStatus}'.`);
        
        // Refresh application display if card exists
        const updatedApp = this.model.getApplicationById(applicationId);
        if (updatedApp && typeof this.view.displayApplicationCard === 'function') {
            this.view.displayApplicationCard(updatedApp);
        }
        
        this.view.hideInlineAssessmentForm(recruiterId);
    } else {
        this.view.showUserStatusMessage("Failed to update application status.", true);
    }

}
    // Inside UserController.js
        // 1. Get form data from View
    handlePublishVacancy(recruiterId) {

        const vacancyData = this.view.getVacancyFormData(recruiterId);

        // Validation
        if (!vacancyData.vacancyId || !vacancyData.positionTitle) {
            this.view.showUserStatusMessage("Please fill in both Vacancy ID and Position Title.", true);
        return;
        }

        // Retrieve Recruiter to get full name
        const recruiter = this.model.getUserById ? this.model.getUserById(recruiterId) : null;
        const recruiterName = recruiter ? recruiter.fullName : '';

        // 2. Instantiate JobVacancy Model Class using correct constructor arguments
        const newVacancy = new JobVacancy(
                vacancyData.vacancyId,
                recruiterId,
                recruiterName,
                vacancyData.positionTitle,
                vacancyData.department,
                vacancyData.description,
                vacancyData.openingDate,
                vacancyData.closingDate
        );

        // 3. Add to Model
        const isAdded = this.model.addJobVacancy(newVacancy);

        // 4. Update UI
        if (isAdded) {
            this.view.showUserStatusMessage(`Job Vacancy '${newVacancy.positionTitle}' published successfully!`);
        
            if (typeof this.view.displayJobVacancyCard === 'function') {
                this.view.displayJobVacancyCard(newVacancy);
                } 
            else if (typeof this.view.displayJobVacancy === 'function') {
                this.view.displayJobVacancy(newVacancy);
                }

            this.view.hideVacancyForm(recruiterId);
            } 
        else {
                this.view.showUserStatusMessage("Failed to publish job vacancy. Vacancy ID might already exist.", true);
                }
    }





    // ************************************************************//
    // Initialize Events
    // ************************************************************//

    initializeEvents() {

        this.view.form.addEventListener(
            "submit",
            (event) => this.registerUser(event)
        );

        document.addEventListener(
            "click",
            (event) => {

                this.deleteUser(event);

                this.handleVacancyButtons(event);

                this.handleApplicationButtons(event);

            }
        );
    }

    // ************************************************************//
    // Register User
    // ************************************************************//

    registerUser(event) {

        event.preventDefault();

        try {

            const data =
                this.view.getFormData();

            if (!data.userType) {

                this.view.showMessage(
                    "Please select a user type.",
                    true
                );

                return;
            }

            switch (data.userType) {

                case "Applicant":

                    const applicant =
                        this.applicantModel.addApplicant(
                            data.userId,
                            data.fullName,
                            data.email
                        );

                    this.view.displayApplicant(
                        applicant
                    );

                    this.view.updateApplicantCount(
                        this.applicantModel
                            .getApplicants().length
                    );

                    break;

                case "Recruiter":

                    const recruiter =
                        this.recruiterModel.addRecruiter(
                            data.userId,
                            data.fullName,
                            data.email
                        );

                    this.view.displayRecruiterCard(
                        recruiter
                    );

                    this.view.updateRecruiterCount(
                        this.recruiterModel
                            .getRecruiters().length
                    );

                    break;

                case "Interviewer":

                    const interviewer =
                        this.interviewerModel.addInterviewer(
                            data.userId,
                            data.fullName,
                            data.email
                        );

                    this.view.displayInterviewer(
                        interviewer
                    );

                    this.view.updateInterviewerCount(
                        this.interviewerModel
                            .getInterviewers().length
                    );

                    break;
            }

            this.view.showMessage(
                `${data.userType} registered successfully.`
            );

            this.view.clearForm();

        }

        catch (error) {

            this.view.showMessage(
                error.message,
                true
            );

        }

    }

    // ************************************************************//
    // Delete User
    // ************************************************************//

deleteUser(event) {

    if (
        !event.target.classList.contains(
            "delete-btn"
        )
    ) {
        return;
    }

    const userId =
        event.target.dataset.id;

    const userType =
        event.target.dataset.type;

    const confirmed = confirm(
        `Are you sure you want to delete ${userType} ${userId}?`
    );

    if (!confirmed) {
        return;
    }

    try {

        switch (userType) {

            case "Applicant":

                this.applicantModel.removeApplicant(
                    userId
                );

                this.view.updateApplicantCount(
                    this.applicantModel
                        .getApplicants().length
                );

                break;

            case "Recruiter":

                this.recruiterModel.removeRecruiter(
                    userId
                );

                this.view.updateRecruiterCount(
                    this.recruiterModel
                        .getRecruiters().length
                );

                break;

            case "Interviewer":

                this.interviewerModel.removeInterviewer(
                    userId
                );

                this.view.updateInterviewerCount(
                    this.interviewerModel
                        .getInterviewers().length
                );

                break;
        }

        this.view.removeCard(
            userId
        );

        this.view.showMessage(
            `${userType} deleted successfully.`
        );

    }

    catch (error) {

        this.view.showMessage(
            error.message,
            true
        );

    }

}

 // ************************************************************//
//              Handle Vacancy Buttons
// ************************************************************//

handleVacancyButtons(event) {

    if (
        event.target.classList.contains(
            "create-vacancy-btn"
        )
    ) {

        const recruiterId =
            event.target.dataset.id;

        this.view.showVacancyForm(
            recruiterId
        );

        return;
    }

    if (
        event.target.classList.contains(
            "save-vacancy-btn"
        )
    ) {

        this.createJobVacancy(
            event
        );

        return;
    }

    if (
        event.target.classList.contains(
            "delete-vacancy-btn"
        )
    ) {

        this.deleteJobVacancy(
            event
        );

        return;
    }

}



// ************************************************************//
//                  Create Job Vacancy
// ************************************************************//

createJobVacancy(event) {

    const recruiterId =
        event.target.dataset.id;

    try {

        const recruiterCard =
            event.target.closest(
                ".record-card"
            );

        const recruiterName =
            recruiterCard.dataset.name;

        const data =
            this.view.getVacancyFormData(
                recruiterId
            );

        const openingDate =
            new Date(
                data.openingDate
            );

        const closingDate =
            new Date(
                data.closingDate
            );

        if (openingDate >= closingDate) {

            this.view.showMessage(
                "Opening date must be before closing date.",
                true
            );

            return;
        }

        const vacancy =
            this.jobVacancyModel.addJobVacancy(

                data.vacancyId,

                recruiterId,

                recruiterName,

                data.positionTitle,

                data.department,

                data.description,

                data.openingDate,

                data.closingDate
            );

        this.view.displayJobVacancy(
            vacancy
        );

        this.view.hideVacancyForm(
            recruiterId
        );

        this.updateJobVacancyCount();

        this.view.showMessage(
            "Job Vacancy Published Successfully."

        );
        this.view.hideVacancyForm(recruiterId);

    }

    catch (error) {

        this.view.showMessage(
            error.message,
            true
        );

        console.error(error);
    }

}
    // ************************************************************//
    // Update Vacancy Count
    // ************************************************************//

    updateJobVacancyCount() {

        const counter =
            document.getElementById(
                "totalJobVacancies"
            );

        if (counter) {

            counter.textContent =
                this.jobVacancyModel
                    .getJobVacancies()
                    .length;
        }

    }

    

// ************************************************************//
//                  Delete Job Vacancy
// ************************************************************//

deleteJobVacancy(event) {

    const vacancyId =
        event.target.dataset.id;

    const confirmed = confirm(
        `Are you sure you want to delete Job Vacancy ${vacancyId}?`
    );

    if (!confirmed) {
        return;
    }

    try {

        this.jobVacancyModel
            .removeJobVacancy(
                vacancyId
            );

        this.view.removeVacancyCard(
            vacancyId
        );

        this.updateJobVacancyCount();

        this.view.showMessage(
            "Job Vacancy Deleted Successfully."
        );

    }

    catch (error) {

        this.view.showMessage(
            error.message,
            true
        );

    }

}

// ************************************************************//
//            Handle Application Buttons
// ************************************************************//

handleApplicationButtons(event) {

    if (
        event.target.classList.contains(
            "apply-job-btn"
        )
    ) {

        const applicantId =
            event.target.dataset.id;

        const vacancies =
            this.jobVacancyModel
                .getJobVacancies();

        this.view.showApplicationForm(
            applicantId,
            vacancies
        );

        return;
    }

    if (
        event.target.classList.contains(
            "save-application-btn"
        )
    ) {

        this.createApplication(
            event
        );

        return;
    }

}



// ************************************************************//
//                Create Application
// ************************************************************//

createApplication(event) {

    const applicantId =
        event.target.dataset.id;

    try {

        const applicantCard =
            event.target.closest(
                ".record-card"
            );

        const applicantName =
            applicantCard.dataset.name;

        const data =
            this.view.getApplicationFormData(
                applicantId
            );

        const vacancy =
            this.jobVacancyModel
                .findJobVacancy(
                    data.vacancyId
                );

        if (!vacancy) {

            throw new Error(
                "Selected vacancy not found."
            );

        }

        if (
            vacancy.getStatus() !== "Open"
        ) {

            throw new Error(
                "Applications are not accepted for this vacancy."
            );

        }

        if (!data.applicationLetter) {

    throw new Error(
        "Application letter is required."
    );

}


        const application =
            this.applicationModel
                .addApplication(

                    data.applicationId,

                    applicantId,

                    applicantName,

                    vacancy.vacancyId,

                    vacancy.positionTitle,

                    data.applicationLetter

                );

        this.view.displayApplication(
            application
        );

        this.updateApplicationCount();

        this.view.hideApplicationForm(applicantId);

        this.view.showMessage(
            "Application submitted successfully."
        );

    }

    catch (error) {

        this.view.showMessage(
            error.message,
            true
        );

    }

}

// ************************************************************//
//            Update Application Count
// ************************************************************//

updateApplicationCount() {

    const counter =
        document.getElementById(
            "totalApplications"
        );

    if (counter) {

        counter.textContent =
            this.applicationModel
                .getApplications()
                .length;

    }

}

}
