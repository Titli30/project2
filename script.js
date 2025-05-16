document.getElementById("resumeForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const imageInput = document.getElementById("profileImage");
  const reader = new FileReader();

  reader.onloadend = () => {
    const fullName = document.getElementById("fullName").value;
    const title = document.getElementById("title").value;
    const profile = document.getElementById("profile").value;
    const guardian = document.getElementById("guardian").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const skills = document.getElementById("skills").value.split(",");
    const languages = document.getElementById("languages").value.split(",");
    const hobbies = document.getElementById("hobbies").value.split(",");

    const company = document.getElementById("company").value;
    const position = document.getElementById("position").value;
    const expDuration = document.getElementById("expDuration").value;
    const expDetails = document.getElementById("expDetails").value;

    const educationTitle = document.getElementById("educationTitle").value;
    const educationInstitute = document.getElementById("educationInstitute").value;
    const educationDuration = document.getElementById("educationDuration").value;

    const projectTitle = document.getElementById("projectTitle").value;
    const projectDesc = document.getElementById("projectDesc").value;
    const projectLink = document.getElementById("projectLink").value;

    let html = `
      <div class="resume-left">
        ${reader.result ? `<img src="${reader.result}" />` : ""}
        <h2>${fullName}</h2>
        <p>${title}</p>
        <h3>Contact</h3>
        <p><i class="fas fa-phone"></i> ${phone}</p>
        <p><i class="fas fa-envelope"></i> ${email}</p>
        <p><i class="fas fa-location-dot"></i> ${address}</p>
        ${guardian ? `<p><strong>Guardian:</strong> ${guardian}</p>` : ""}
        <h3>Skills</h3>
        <ul>${skills.map(s => `<li>${s.trim()}</li>`).join("")}</ul>
        <h3>Languages</h3>
        <ul>${languages.map(l => `<li>${l.trim()}</li>`).join("")}</ul>
        <h3>Hobbies</h3>
        <ul>${hobbies.map(h => `<li>${h.trim()}</li>`).join("")}</ul>
      </div>
      <div class="resume-right">
        <h3>Profile</h3>
        <p>${profile}</p>

        ${company || position ? `
          <h3>Experience</h3>
          <p><strong>${position}</strong> at ${company} (${expDuration})</p>
          <p>${expDetails}</p>
        ` : ''}

        <h3>Education</h3>
        <p><strong>${educationTitle}</strong> - ${educationInstitute} (${educationDuration})</p>

        ${projectTitle ? `
          <h3>Project</h3>
          <p><strong>${projectTitle}</strong></p>
          <p>${projectDesc}</p>
          ${projectLink ? `<p><a href="${projectLink}" target="_blank">${projectLink}</a></p>` : ""}
        ` : ''}
      </div>
    `;

    document.getElementById("resumeOutput").innerHTML = html;
  };

  if (imageInput.files[0]) {
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    reader.onloadend();
  }
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  const element = document.getElementById("resumeOutput");
  html2pdf().from(element).save("My_Resume.pdf");
});
