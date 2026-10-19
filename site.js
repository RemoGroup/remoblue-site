'use strict';
// Illustrative marketing scenarios; no live customer data.
const industries = {
  'real-estate': {name:'Real Estate', title:'Keep your clients moving. Keep your day under control.', description:'From the first inquiry to the next referral, bring follow-up, listing activity, and client updates into one operating plan.', work:['Follow up with buyer and seller inquiries','Coordinate listing and appointment tasks','Keep clients and referral relationships informed'], quote:'Several recent inquiries are still waiting for a next step. I recommend following up and offering times from your calendar.', owner:'Set your service standards, approve the plan, and step in for the client decisions that need you.'},
  mortgage: {name:'Mortgage Lending', title:'A clearer pipeline. A better borrower experience.', description:'Bring borrower follow-up, document requests, and milestone communication together so each relationship has a clear next step.', work:['Coordinate borrower and referral-partner follow-up','Organize document requests and reminders','Keep clients informed about recorded milestones'], quote:'Several borrowers have outstanding document requests. I recommend a focused follow-up before we add more inquiries to the pipeline.', owner:'Own lending advice, credit decisions, and required approvals. Remo coordinates the agreed follow-up and information.'},
  contractor: {name:'Contractors', title:'Keep the jobs moving. Give your day some breathing room.', description:'Connect estimates, available capacity, customer updates, and follow-up in a plan shaped around your services and crew.', work:['Follow up on estimates and incoming inquiries','Coordinate appointments and job reminders','Prepare customer reactivation and service campaigns'], quote:'Next week has room for more work. I recommend contacting past customers before increasing your advertising budget.', owner:'Set service areas, scheduling rules, and budgets. Review custom estimates and exceptions that need your judgment.'},
  ecommerce: {name:'Ecommerce', title:'Bring your customers, products, and growth plan together.', description:'Coordinate customer follow-up and marketing with the product and sales information available from your connected store.', work:['Organize customer questions and follow-up','Prepare product and repeat-purchase campaigns','Review sales trends and inventory priorities'], quote:'A product is getting repeat purchases. Let’s check available stock and margins before planning its next promotion.', owner:'Approve product decisions, supplier commitments, and budgets. Define the customer-service policies Remo can follow.'},
  retail: {name:'Retail', title:'Keep your store running. Keep customers coming back.', description:'Bring store promotions, stock priorities, customer follow-up, and staff coordination into a plan built around your shop.', work:['Prepare local promotions and repeat-customer campaigns','Review stock priorities and coordinate store tasks','Keep customer questions and follow-up moving'], quote:'The weekend promotion is ready. Let’s check stock and staff coverage before inviting more customers into the store.', owner:'Set merchandising priorities, service standards, and budgets. Approve supplier commitments, staffing decisions, and exceptions.'},
  legal: {name:'Law Firms', title:'Keep intake organized. Keep clients informed.', description:'Bring consultation requests, client follow-up, and administrative coordination into a clear operating plan for your practice.', work:['Coordinate intake and consultation requests','Organize document requests and client reminders','Prepare administrative and billing follow-up'], quote:'Several consultation requests need a response. I recommend confirming the intake details and offering the available appointment times.', owner:'Retain legal advice, conflict determinations, case strategy, and professional sign-offs with the appropriate attorney.'},
  accounting: {name:'Accounting Firms', title:'Keep client work moving through every busy season.', description:'Coordinate client requests, recurring work, and team priorities around your firm’s services and deadlines.', work:['Organize client document requests and reminders','Coordinate recurring work and team assignments','Prepare renewal and receivables follow-up'], quote:'Outstanding client documents could delay this week’s work. I recommend prioritizing reminders by the next recorded deadline.', owner:'Retain accounting judgments, tax positions, filing authorization, and professional sign-offs with your qualified team.'},
  manufacturing: {name:'Manufacturing', title:'Keep orders, production, and customer promises connected.', description:'Bring quote follow-up, production priorities, and customer communication into a shared view of what needs attention.', work:['Coordinate quote and order follow-up','Organize supplier and production handoffs','Prepare customer updates and capacity reviews'], quote:'New inquiries are increasing. Let’s review production capacity and material availability before promising additional delivery dates.', owner:'Own production commitments, purchasing authority, quality decisions, and the physical work performed by your team.'}
};
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
if (menuButton && mobileNav) {
  function closeMenu() { mobileNav.hidden = true; menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Open navigation'); }
  menuButton.addEventListener('click', () => { const expanded = menuButton.getAttribute('aria-expanded') === 'true'; mobileNav.hidden = expanded; menuButton.setAttribute('aria-expanded',String(!expanded)); menuButton.setAttribute('aria-label',expanded ? 'Open navigation' : 'Close navigation'); });
  mobileNav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); } });
}
const industryButtons = document.querySelectorAll('[data-industry]');
const industryScenes = {
  'real-estate': {src:'assets/remogm-real-estate-v1.webp', alt:'Illustrative real estate agent reviewing property listings and an appointment planner'},
  mortgage: {src:'assets/remogm-mortgage-v1.webp', alt:'Illustrative mortgage loan officer reviewing borrower documents beside a laptop'},
  contractor: {src:'assets/remogm-contractor-v1.webp', alt:'Illustrative contractor reviewing a tablet beside project plans in a workshop'},
  ecommerce: {src:'assets/remogm-ecommerce-v1.webp', alt:'Illustrative ecommerce owner reviewing orders on a tablet at a packing station'},
  retail: {src:'assets/remogm-retail-v1.webp', alt:'Illustrative shop owner reviewing store priorities on a tablet at the counter'},
  legal: {src:'assets/remogm-legal-v1.webp', alt:'Illustrative attorney organizing a client intake folder and consultation planner'},
  accounting: {src:'assets/remogm-accounting-v1.webp', alt:'Illustrative accountant checking client receipts against a document checklist'},
  manufacturing: {src:'assets/remogm-manufacturing-v1.webp', alt:'Illustrative manufacturing supervisor reviewing production priorities at a packing bench'}
};
function selectIndustry(key) {
  const entry = industries[key];
  if (!Object.hasOwn(industries,key) || !document.querySelector('#industry-title')) return;
  industryButtons.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.industry === key)));
  document.querySelector('#industry-label').textContent = `RemoGM for ${entry.name}`;
  document.querySelector('#industry-title').textContent = entry.title;
  document.querySelector('#industry-description').textContent = entry.description;
  document.querySelector('#industry-work').replaceChildren(...entry.work.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
  document.querySelector('#industry-quote').textContent = `“${entry.quote}”`;
  document.querySelector('#industry-owner').textContent = entry.owner;
  document.querySelector('#industry-cta').href = `book.html?industry=${encodeURIComponent(key)}`;
  const scene = document.querySelector('#industry-scene');
  const image = document.querySelector('#industry-image');
  if (scene && image) {
    const visual = industryScenes[key];
    scene.hidden = !visual;
    if (visual) { image.src = visual.src; image.alt = visual.alt; }
  }
}
industryButtons.forEach(button => button.addEventListener('click', () => selectIndustry(button.dataset.industry)));
const selectedIndustry = new URLSearchParams(window.location.search).get('industry');
selectIndustry(Object.hasOwn(industries, selectedIndustry) ? selectedIndustry : 'contractor');
// Preparing the request never contacts a server, sends mail, or books an appointment.
const requestForm = document.querySelector('#request-form');
if (requestForm) {
  const selection = requestForm.elements.industry;
  if ([...selection.options].some(option => option.value === selectedIndustry)) selection.value = selectedIndustry;
  requestForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!requestForm.reportValidity()) return;
    const data = new FormData(requestForm);
    const name = String(data.get('name')).trim();
    const business = String(data.get('business')).trim();
    const focus = String(data.get('focus')).trim();
    const industry = selection.options[selection.selectedIndex].text;
    const subject = `RemoGM demo request — ${industry}`;
    const body = `Hello RemoGM team,\n\nI'd like to discuss RemoGM for my business.\n\nName: ${name}\nBusiness: ${business}\nIndustry: ${industry}\nWork I'd like help with: ${focus || 'I would like to discuss this during the demo.'}\n\nPlease reply with next steps and possible demo times.\n\nThank you,\n${name}`;
    document.querySelector('#request-draft').value = body;
    document.querySelector('#open-email').href = `mailto:remo@remogroup.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.querySelector('#draft-result').hidden = false;
    document.querySelector('#copy-status').textContent = '';
    document.querySelector('#draft-heading').focus();
  });
  document.querySelector('#copy-draft').addEventListener('click', async () => {
    const field = document.querySelector('#request-draft');
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(field.value);
      document.querySelector('#copy-status').textContent = 'Copied. Paste it into an email to remo@remogroup.ai and send when ready.';
    } catch {
      field.focus(); field.select();
      document.querySelector('#copy-status').textContent = 'Select and copy the request above, then email it to remo@remogroup.ai.';
    }
  });
  document.querySelector('#request-fields').disabled = false;
}
