(function () {
  function buildList(items) {
    return '<ul>' + items.map(function (item) {
      return '<li>' + item + '</li>';
    }).join('') + '</ul>';
  }

  function buildExperience(experience) {
    return experience.map(function (item) {
      return [
        '<div class="timeline-item">',
        '<h3>' + item.role + ' | ' + item.company + '</h3>',
        '<div class="timeline-meta">' + item.meta + '</div>',
        buildList(item.bullets),
        '</div>'
      ].join('');
    }).join('');
  }

  function buildCertifications(certs) {
    return certs.map(function (item) {
      return '<li><strong>' + item.name + '</strong> - ' + item.issuer + ' (' + item.date + ')</li>';
    }).join('');
  }

  function buildCourses(courses) {
    return courses.map(function (item) {
      return '<li><strong>' + item.code + '</strong>: ' + item.detail + '</li>';
    }).join('');
  }

  function renderResume(data) {
    const root = document.getElementById('resume-root');
    const contacts = data.contacts;

    root.innerHTML = [
      '<article class="card">',
      '<h1>' + data.name + '</h1>',
      '<p class="hero-subtitle">' + data.headline + '</p>',
      '<div class="quick-links">',
      '<a class="chip" href="mailto:' + contacts.email + '">' + contacts.email + '</a>',
      '<a class="chip" href="' + contacts.linkedin + '" target="_blank" rel="noopener noreferrer">LinkedIn</a>',
      '<a class="chip" href="' + contacts.github + '" target="_blank" rel="noopener noreferrer">GitHub</a>',
      '<a class="chip" href="' + contacts.resumePdf + '" target="_blank" rel="noopener noreferrer">Download Resume PDF</a>',
      '</div>',
      '</article>',

      '<article class="card">',
      '<div class="section-title">Professional Experience</div>',
      buildExperience(data.experience),
      '</article>',

      '<article class="card two-col">',
      '<section>',
      '<div class="section-title">Education</div>',
      '<h3>' + data.education.master.title + '</h3>',
      '<p>' + data.education.master.school + '<br />' + data.education.master.meta + '</p>',
      '<p><strong>Award:</strong> ' + data.education.master.award + '</p>',
      '<h3>' + data.education.bachelor.title + '</h3>',
      '<p>' + data.education.bachelor.school + '<br />' + data.education.bachelor.meta + '</p>',
      '<p><strong>Distinction:</strong> ' + data.education.bachelor.award + '</p>',
      '</section>',

      '<section>',
      '<div class="section-title">Selected Coursework</div>',
      '<ul>' + buildCourses(data.coursework) + '</ul>',
      '</section>',
      '</article>',

      '<article class="card two-col">',
      '<section>',
      '<div class="section-title">Technical Expertise</div>',
      buildList([
        '<strong>Frontend:</strong> ' + data.skills.frontend,
        '<strong>Backend / ML:</strong> ' + data.skills.backend,
        '<strong>Languages:</strong> ' + data.skills.languages,
        '<strong>Databases:</strong> ' + data.skills.databases,
        '<strong>Cloud:</strong> ' + data.skills.cloud
      ]),
      '</section>',
      '<section>',
      '<div class="section-title">Hackathons, Projects, Certifications</div>',
      '<p><strong>Hackathon:</strong> ' + data.hackathon + '</p>',
      '<p><strong>GitHub Projects:</strong></p>',
      buildList(data.projects),
      '<p><strong>Certifications:</strong></p>',
      '<ul>' + buildCertifications(data.certifications) + '</ul>',
      '</section>',
      '</article>'
    ].join('');

    const contactGrid = document.getElementById('contact-grid');
    contactGrid.innerHTML = [
      '<div class="contact-row"><strong>Email:</strong> <a href="mailto:' + contacts.email + '">' + contacts.email + '</a></div>',
      '<div class="contact-row"><strong>LinkedIn:</strong> <a href="' + contacts.linkedin + '" target="_blank" rel="noopener noreferrer">' + contacts.linkedin.replace(/^https?:\/\//, '') + '</a></div>',
      '<div class="contact-row"><strong>GitHub:</strong> <a href="' + contacts.github + '" target="_blank" rel="noopener noreferrer">' + contacts.github.replace(/^https?:\/\//, '') + '</a></div>'
    ].join('');
  }

  async function loadResume() {
    try {
      const response = await fetch('content/resume.json');
      if (!response.ok) {
        throw new Error('Unable to load resume content');
      }

      const data = await response.json();
      renderResume(data);
    } catch (error) {
      const root = document.getElementById('resume-root');
      root.innerHTML = '<article class="card"><p>Resume content is temporarily unavailable.</p></article>';
    }
  }

  window.addEventListener('DOMContentLoaded', loadResume);
})();
