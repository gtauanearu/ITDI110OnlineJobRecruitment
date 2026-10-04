//***********************************************/
//In this section we configure the form based on the type of user, whenever the user chose his type of user, the form takes into account his choice. 
//********************************************* */
const select =
    document.getElementById("typeOfUser");

const formTitle =
    document.getElementById("formTitle");

const userId =
    document.getElementById("userId");

const userIdLabel =
    document.getElementById("userIdlabel");

const registerButton =
    document.getElementById("registerButton");

select.addEventListener("change", () => {

    formTitle.textContent =
        `Register ${select.value}`;

    registerButton.textContent =
        `Register ${select.value}`;

    switch (select.value) {

        case "Applicant":

            userIdLabel.textContent =
                "Applicant ID";

            userId.placeholder =
                "e.g. AP001";

            break;

        case "Recruiter":

            userIdLabel.textContent =
                "Recruiter ID";

            userId.placeholder =
                "e.g. RE001";

            break;

        case "Interviewer":

            userIdLabel.textContent =
                "Interviewer ID";

            userId.placeholder =
                "e.g. IN001";

            break;

        default:

            userIdLabel.textContent =
                "User ID";

            userId.placeholder =
                "e.g. US001";
    }
});

 // ************************************************************//
//                         UserView
// ************************************************************//

class UserView {

    constructor() {

        // ==========================
        // Form Elements
        // ==========================

        this.form = document.getElementById("userForm");

        this.jobVacancyRecords = document.getElementById("jobVacancyRecords");

        this.typeOfUser =
            document.getElementById("typeOfUser");

        this.userId =
            document.getElementById("userId");

        this.userName =
            document.getElementById("userName");

        this.userEmail =
            document.getElementById("userEmail");

        this.message =
            document.getElementById("message");

        // ==========================
        // Record Containers
        // ==========================

        this.applicantRecords =
            document.getElementById("applicantRecords");

        this.recruiterRecords =
            document.getElementById("recruiterRecords");

        this.interviewerRecords =
            document.getElementById("interviewerRecords");

        this.applicationRecords =
            document.getElementById("applicationRecords");
        this.assessedApplicationRecords = document.getElementById("assessedApplicationRecords");


        // ==========================
        // Empty Messages
        // ==========================

        this.emptyApplicantMessage =
            document.getElementById("emptyApplicantMessage");

        this.emptyRecruiterMessage =
            document.getElementById("emptyRecruiterMessage");

        this.emptyInterviewerMessage =
            document.getElementById("emptyInterviewerMessage");

        this.emptyJobVacancyMessage =
            document.getElementById("emptyJobVacancyMessage");

        this.emptyApplicationMessage =
            document.getElementById("emptyApplicationMessage");

        this.emptyAssessedApplicationMessage = 
            document.getElementById("emptyAssessedApplicationMessage");

        // ==========================
        // Dashboard Counters
        // ==========================

        this.totalApplicants =
            document.getElementById("totalApplicants");

        this.totalRecruiters =
            document.getElementById("totalRecruiters");

        this.totalInterviewers =
            document.getElementById("totalInterviewers");
        this.totalApplicationsAssessed = 
            document.getElementById("totalApplicationsAssessed")
    }

    // ************************************************************//
    // Display Success or Error Messages
    // ************************************************************//

    showMessage(message, isError = false) {

        this.message.textContent = message;

        if (isError) {
            this.message.style.color = "red";
        }
        else {
            this.message.style.color = "green";
        }
    }

    // ************************************************************//
    // Clear Form
    // ************************************************************//

    clearForm() {

        this.form.reset();

            formTitle.textContent = "Register User";

            registerButton.textContent ="Register User";

            userIdLabel.textContent ="User ID";

            userId.placeholder ="e.g. US001";
    }

    // ************************************************************//
    // Display Applicant
    // ************************************************************//

    displayApplicant(applicant) {

        this.emptyApplicantMessage.style.display = "none";

        const card = document.createElement("div");

        card.classList.add("record-card");

        card.dataset.id = applicant.userId;
        card.dataset.type = "Applicant";
        card.dataset.name = applicant.fullName;
        card.innerHTML = `
            <strong>${applicant.userId}</strong><br>
            ${applicant.fullName}<br>
            ${applicant.email}<br><br>

        <button
            class="apply-job-btn"
            data-id="${applicant.userId}"
            data-type="Applicant">
            Apply For Job
        </button>

        <button
            class="delete-btn"
            data-id="${applicant.userId}"
            data-type="Applicant">
            Delete
        </button>

        <div
            id="applicationForm-${applicant.userId}"
            class="application-form"
            style="display:none;">
        </div>
    `;

    this.applicantRecords.appendChild(card);
}
   // Inside UserView.js

displayRecruiterCard(recruiter) {
    this.emptyRecruiterMessage.style.display = "none";

    const card = document.createElement("div");

    card.classList.add("record-card");

    card.dataset.id = recruiter.userId;
    card.dataset.type = "Recruiter";
    card.dataset.name = recruiter.fullName;

    card.innerHTML = `
        <strong>${recruiter.userId}</strong><br>
        ${recruiter.fullName}<br>
        ${recruiter.email}<br><br>

        <button
            class="create-vacancy-btn"
            data-id="${recruiter.userId}"
            data-name="${recruiter.fullName}">
            Create Job Vacancy
        </button>

        <button
            class="assess-applications-btn"
            data-id="${recruiter.userId}"
            data-name="${recruiter.fullName}">
            Assess Applications
        </button>

        <button
            class="delete-btn"
            data-id="${recruiter.userId}"
            data-type="Recruiter">
            Delete
        </button>

        <!-- Container for Job Vacancy Form -->
        <div
            id="vacancyForm-${recruiter.userId}"
            class="vacancy-form"
            style="display:none;">
        </div>

        <!-- Container for Assessment Panel -->
        <div
            id="inlineAssessmentContainer-${recruiter.userId}"
            class="inline-assessment-panel"
            style="display:none; margin-top: 10px;">
        </div>
    `;

    this.recruiterRecords.appendChild(card);
}

    // ************************************************************//
    // Display Interviewer
    // ************************************************************//
    displayInterviewer(interviewer) {

        this.emptyInterviewerMessage.style.display = "none";

        const card = document.createElement("div");

        card.classList.add("record-card");

        card.dataset.id = interviewer.userId;
        card.dataset.type = "Interviewer";

        card.innerHTML = `
            <strong>${interviewer.userId}</strong><br>
            ${interviewer.fullName}<br>
            ${interviewer.email}<br><br>

                <button
                    class="delete-btn"
                    data-id="${interviewer.userId}"
                data-type="Interviewer">
                Delete
            </button>
            `;

    this.interviewerRecords.appendChild(card);
}

    // ************************************************************//
    // Update Dashboard Counts
    // ************************************************************//

    updateApplicantCount(count) {
        this.totalApplicants.textContent = count;
    }

    updateRecruiterCount(count) {
        this.totalRecruiters.textContent = count;
    }

    updateInterviewerCount(count) {
        this.totalInterviewers.textContent = count;
    }

    // ************************************************************//
    // Get Form Data
    // ************************************************************//

    getFormData() {

        return {
            userType: this.typeOfUser.value,
            userId: this.userId.value.trim(),
            fullName: this.userName.value.trim(),
            email: this.userEmail.value.trim()
        };
    }

    removeCard(userId) {

    const card = document.querySelector(
        `[data-id="${userId}"]`
        );

        if (card) {
            card.remove();
      }
    }

 

// ************************************************************//
//                Show Vacancy Form
// ************************************************************//

    showVacancyForm(recruiterId) {

        const container =
            document.getElementById(
                `vacancyForm-${recruiterId}`
            );

        if (!container) {
            return;
            }

        container.style.display = "block";

        container.innerHTML = `

        <hr>

            <h4>Create Job Vacancy</h4>

            <div class="form-group">
                <label>Vacancy ID</label>
                <input
                    type="text"
                    id="vacancyId-${recruiterId}"
                    placeholder="e.g. JV001">
            </div>

            <div class="form-group">
                <label>Position Title</label>
                <input
                    type="text"
                    id="positionTitle-${recruiterId}"
                    placeholder="e.g. Web Developer">
            </div>

            <div class="form-group">
                <label>Department</label>
                <input
                    type="text"
                    id="department-${recruiterId}"
                    placeholder="e.g. ICT">
            </div>

            <div class="form-group">
                <label>Description</label>

                <textarea
                    id="description-${recruiterId}"
                    rows="1"
                    placeholder="Enter Vacancy desciption">
                </textarea>
            </div>
            <div class="form-group">
                <label>Opening Date</label>

                <input
                    type="date"
                    id="openingDate-${recruiterId}">
            </div>

            <div class="form-group">
                <label>Closing Date</label>

                 <input
                    type="date"
                        id="closingDate-${recruiterId}">
            </div>
            <button
                class="save-vacancy-btn"
                data-id="${recruiterId}">
                Publish Vacancy
            </button>
            <button class="cancel-vacancy-btn" data-id="${recruiterId}">Cancel</button>

        `;
}

// ************************************************************//
//                Get Vacancy Form Data
// ************************************************************//

    getVacancyFormData(recruiterId) {

        return {

            vacancyId:
                document.getElementById(
                    `vacancyId-${recruiterId}`
                ).value.trim(),

            positionTitle:
                document.getElementById(
                    `positionTitle-${recruiterId}`
                ).value.trim(),

            department:
                document.getElementById(
                    `department-${recruiterId}`
                ).value.trim(),

            description:
                document.getElementById(
                    `description-${recruiterId}`
                ).value.trim(),

            openingDate:
                document.getElementById(
                    `openingDate-${recruiterId}`
            ).value,

        closingDate:
            document.getElementById(
                `closingDate-${recruiterId}`    
            ).value
    };
}
// ************************************************************//
//                Hide Vacancy Form
// ************************************************************//

    hideVacancyForm(recruiterId) {

        const container =
            document.getElementById(
                `vacancyForm-${recruiterId}`
            );

            if (container) {

            container.style.display =
                "none";

            container.innerHTML = "";
            }
    }




// ************************************************************//
//                  Remove Vacancy Card
// ************************************************************//

    removeVacancyCard(vacancyId) {

        const card =
            document.querySelector(
                `[data-id="${vacancyId}"][data-type="JobVacancy"]`
            );

            if (card) {
            card.remove();
            }

    }


// ************************************************************//
//                Display Job Vacancy
// ************************************************************//

    displayJobVacancy(vacancy) {
            if (
                this.emptyJobVacancyMessage
                ) {this.emptyJobVacancyMessage.style.display =
                "none";
                    }

        const card =
            document.createElement("div");

            card.classList.add("record-card");

            card.dataset.id =
            vacancy.vacancyId;

            card.dataset.type =
                "JobVacancy";

            card.innerHTML = `
            <strong>${vacancy.positionTitle}</strong><br>

            Vacancy ID:
            ${vacancy.vacancyId}<br>

            Recruiter:
            ${vacancy.recruiterName}<br>

            Department:
            ${vacancy.department}<br>

            Description:
            ${vacancy.description}<br><br>
        
            <button
            class="delete-vacancy-btn"
            data-id="${vacancy.vacancyId}">
            Delete Vacancy
            </button>
        `;

        this.jobVacancyRecords.appendChild(
        card
            );

    }

// 
// ************************************************************//
//                showApplicationForm
// ************************************************************//

    showApplicationForm(applicantId, vacancies) {

        const container =
            document.getElementById(
                `applicationForm-${applicantId}`
            );

        if (!container) {
        return;
        }

        const options =
            vacancies
                .filter(
                    vacancy =>
                        vacancy.getStatus() === "Open"
                )
                .map(
                vacancy =>
                    `<option value="${vacancy.vacancyId}">
                        ${vacancy.positionTitle}
                    </option>`
                )
                .join("");

            container.style.display =
                "block";

            container.innerHTML = `

                <hr>

                <h4>Apply For Job</h4>

                <div class="form-group">

                    <label>
                        Application ID
                    </label>

                    <input
                    type="text"
                    id="applicationId-${applicantId}"
                    placeholder="e.g. APP001">

                </div>

                <div class="form-group">

                    <label>
                        Select Vacancy
                    </label>

                <select
                    id="vacancySelect-${applicantId}">

                    ${options}

                </select>

                </div>
                <div class="form-group">
            
                    <label>
                    Application Letter
                    </label>
             
                    <textarea
                        id="applicationLetter-${applicantId}"
                        rows="6"
                        placeholder="Write your application letter here...">
                    </textarea>
                </div>
                <button
                    class="save-application-btn"
                    data-id="${applicantId}">
                    Submit Application
                </button>
                <button class="cancel-application-btn" data-id="${applicantId}">
                    Cancel
                </button>

                `;
    console.log(vacancies);
    
    vacancies.forEach(vacancy =>
    console.log(
            vacancy.positionTitle,
            vacancy.getStatus()
        )
    );
}

    displayApplication(application) {

    if (this.emptyApplicationMessage) {
                this.emptyApplicationMessage.style.display = "none";


    }

    const card =
        document.createElement("div");

        card.classList.add(
            "record-card"
         );

        card.innerHTML = `

            <strong>
                ${application.applicationId}
            </strong>

            <br>

            Applicant:
            ${application.applicantName}

            <br>

            Vacancy:
            ${application.vacancyTitle}


            <br>

            Status:
            ${application.status}

            <br>

                Letter:
            
            <br>

            ${application.applicationLetter}

        `;

        this.applicationRecords
            .appendChild(card);
}

        
// ************************************************************//
//               Get Application Form Data
// ************************************************************//
    getApplicationFormData(applicantId) {

    return {

        applicationId:
            document.getElementById(
                `applicationId-${applicantId}`
            ).value.trim(),

        vacancyId:
            document.getElementById(
                `vacancySelect-${applicantId}`
            ).value,

        applicationLetter:
            document.getElementById(
                `applicationLetter-${applicantId}`
            ).value.trim()

    };

}

// ************************************************************//
//          Hide Application Form
// ************************************************************//

    hideApplicationForm(applicantId) {

        const container =
            document.getElementById(
                `applicationForm-${applicantId}`
            );

        if (container) {

            container.style.display =
            "none";

            container.innerHTML = "";

            }

    }

// Inside UserView.js

showInlineAssessmentForm(recruiterId, applications) {
    const container = document.getElementById(`inlineAssessmentContainer-${recruiterId}`);
    if (!container) return;

    if (applications.length === 0) {
        container.innerHTML = `<p style="color: #666;">No applications submitted for your vacancies yet.</p>`;
        container.style.display = 'block';
        return;
    }

    const options = applications
        .map(app => `<option value="${app.applicationId}">${app.applicationId} - ${app.applicantName} (${app.vacancyTitle || app.vacancyId})</option>`)
        .join('');

    container.innerHTML = `
        <div class="assessment-card" style="border:1px solid #ccc; padding:10px; border-radius:5px; background:#f9f9f9;">
            <h4>Assess Candidate Application</h4>
            <div class="form-group">
                <label>Select Application:</label>
                <select id="assessmentAppSelect-${recruiterId}">
                    ${options}
                </select>
            </div>
            <div class="form-group">
                <label>Status Decision:</label>
                <select id="assessmentStatusSelect-${recruiterId}">
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>
            <div class="form-group">
                <label>Feedback / Notes:</label>
                <textarea id="assessmentNotesInput-${recruiterId}" rows="3" placeholder="Enter notes..."></textarea>
            </div>
            <button class="submit-assessment-btn" data-id="${recruiterId}">Save Assessment</button>
            <button class="cancel-assessment-btn" data-id="${recruiterId}">Cancel</button>
        </div>
    `;
    container.style.display = 'block';
}

hideInlineAssessmentForm(recruiterId) {
    const container = document.getElementById(`inlineAssessmentContainer-${recruiterId}`);
    if (container) {
        container.style.display = 'none';
        container.innerHTML = '';
    }
}

// Inside UserView.js

hideApplicationForm(applicantId) {
    const container = document.getElementById(`applicationForm-${applicantId}`);
    if (container) {
        // Clear all input fields inside this container
        const inputs = container.querySelectorAll('input, textarea');
        inputs.forEach(input => input.value = '');

        const select = container.querySelector('select');
        if (select) select.selectedIndex = 0;

        // Hide the container
        container.style.display = 'none';
    }
}

// Inside UserView.js

hideVacancyForm(recruiterId) {
    const container = document.getElementById(`vacancyForm-${recruiterId}`);
    if (container) {
        // Clear all input fields inside this container
        const inputs = container.querySelectorAll('input, textarea');
        inputs.forEach(input => input.value = '');

        // Hide the container
        container.style.display = 'none';
    }
}

// Inside UserView.js

getVacancyFormData(recruiterId) {
    const vacancyIdEl = document.getElementById(`vacancyIdInput-${recruiterId}`);
    const positionTitleEl = document.getElementById(`positionTitleInput-${recruiterId}`);
    const departmentEl = document.getElementById(`departmentInput-${recruiterId}`);
    const descriptionEl = document.getElementById(`descriptionInput-${recruiterId}`);
    const openingDateEl = document.getElementById(`openingDateInput-${recruiterId}`);
    const closingDateEl = document.getElementById(`closingDateInput-${recruiterId}`);

    return {
        vacancyId: vacancyIdEl ? vacancyIdEl.value.trim() : '',
        positionTitle: positionTitleEl ? positionTitleEl.value.trim() : '',
        department: departmentEl ? departmentEl.value.trim() : '',
        description: descriptionEl ? descriptionEl.value.trim() : '',
        openingDate: openingDateEl ? openingDateEl.value : '',
        closingDate: closingDateEl ? closingDateEl.value : ''
    };
}


}


