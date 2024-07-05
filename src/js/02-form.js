import throttle from 'lodash.throttle';
const formFeed = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');

const formValue = {};

if (localStorage.getItem('feedback-form-state')) {
  const currentFeedbackFormStateValue = localStorage.getItem(
    'feedback-form-state'
  );
  if (JSON.parse(currentFeedbackFormStateValue).email) {
    const currentEmailValue = JSON.parse(
      localStorage.getItem('feedback-form-state')
    ).email;
    emailInput.value = currentEmailValue;
    formValue.email = currentEmailValue;
  }

  if (JSON.parse(currentFeedbackFormStateValue).message) {
    const currentMessageValue = JSON.parse(
      localStorage.getItem('feedback-form-state')
    ).message;
    messageInput.value = currentMessageValue;
    formValue.message = currentMessageValue;
  }
}

formFeed.addEventListener(
  'input',
  throttle(event => {
    formValue[event.target.name] = event.target.value;
    localStorage.setItem('feedback-form-state', JSON.stringify(formValue));
  }, 500)
);

formFeed.addEventListener('submit', event => {
  event.preventDefault();
  if (emailInput.value === '' || messageInput.value === '') {
    return alert('All form fields must be completed.');
  }
  console.log(formValue);
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
});
