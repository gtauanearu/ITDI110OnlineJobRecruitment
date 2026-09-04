class User {
  constructor(userId, name, email) {
    this.userId = userId;
    this.name = name;
    this.email = email;
  }
  login() { /* ... */ }
  logout() { /* ... */ }
}

class Applicant extends User {
  constructor(userId, name, email, resume) {
    super(userId, name, email);
    this.#resume = resume; // encapsulated
  }
  submitApplication(job) { /* ... */ }
  getResume() { return this.#resume; }
}

class Recruiter extends User {
  shortlistCandidate(application) { /* ... */ }
  notifyApplicant(applicant) { /* ... */ }
}

class Job {
  constructor(jobId, title, description, requirements) {
    this.jobId = jobId;
    this.title = title;
    this.description = description;
    this.requirements = requirements;
    this.status = "open";
  }
  closeJob() { this.status = "closed"; }
}

class Application {
  constructor(applicationId, applicant, job) {
    this.applicationId = applicationId;
    this.applicant = applicant;
    this.job = job;
    this.status = "submitted";
    this.observers = [];
  }
  addObserver(observer) { this.observers.push(observer); }
  updateStatus(newStatus) {
    this.status = newStatus;
    this.observers.forEach(obs => obs.notify(this));
  }
}

