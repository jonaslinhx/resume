(function () {
  function chipWithIcon(href, label, icon, extraAttrs) {
    const attrs = extraAttrs ? ' ' + extraAttrs : '';
    return '<a class="chip" href="' + href + '"' + attrs + '><span class="chip-icon" aria-hidden="true">' + icon + '</span><span class="chip-label">' + label + '</span></a>';
  }

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
    const emailIcon = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg>';
    const linkedInIcon = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M6.94 8.5a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm-1.5 2.15h3V19h-3v-8.35Zm5.3 0h2.87v1.13h.04c.4-.75 1.37-1.54 2.82-1.54 3.02 0 3.57 1.99 3.57 4.57V19h-3v-3.81c0-.9-.02-2.06-1.26-2.06-1.26 0-1.45.98-1.45 1.99V19h-3v-8.35Z\"></path></svg>';
    const githubIcon = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.16c-3.22.7-3.9-1.37-3.9-1.37-.53-1.33-1.29-1.69-1.29-1.69-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.74 1.26 3.4.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.72 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.17 1.18a11.05 11.05 0 0 1 5.76 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.57.23 2.73.11 3.02.74.8 1.19 1.82 1.19 3.08 0 4.45-2.71 5.42-5.29 5.71.41.35.77 1.04.77 2.1v3.11c0 .31.21.67.79.56A11.5 11.5 0 0 0 12 .5Z\"></path></svg>';
    const fileIcon = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v5h5"></path><path d="M12 18v-6"></path><path d="m9.5 14.5 2.5 2.5 2.5-2.5"></path></svg>';

    root.innerHTML = [
      '<article class="card">',
      '<h1>' + data.name + '</h1>',
      '<p class="hero-subtitle">' + data.headline + '</p>',
      '<div class="quick-links">',
      chipWithIcon('mailto:' + contacts.email, contacts.email, emailIcon),
      chipWithIcon(contacts.linkedin, 'LinkedIn', linkedInIcon, 'target="_blank" rel="noopener noreferrer"'),
      chipWithIcon(contacts.github, 'GitHub', githubIcon, 'target="_blank" rel="noopener noreferrer"'),
      chipWithIcon(contacts.resumePdf, 'Download Resume PDF', fileIcon, 'target="_blank" rel="noopener noreferrer"'),
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
