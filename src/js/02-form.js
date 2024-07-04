import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const emailInputRef = document.querySelector('input[name="email"]');
const messageInputRef = document.querySelector('textarea[name="message"]');

const formValue = {};

if (localStorage.getItem('feedback-form-state')) {
  const currentFeedbackFormStateValue = localStorage.getItem(
    'feedback-form-state'
  );
  if (JSON.parse(currentFeedbackFormStateValue).email) {
    const currentEmailValue = JSON.parse(
      localStorage.getItem('feedback-form-state')
    ).email;
    emailInputRef.value = currentEmailValue;
    formValue.email = currentEmailValue;
  }

  if (JSON.parse(currentFeedbackFormStateValue).message) {
    const currentMessageValue = JSON.parse(
      localStorage.getItem('feedback-form-state')
    ).message;
    messageInputRef.value = currentMessageValue;
    formValue.message = currentMessageValue;
  }
}

formRef.addEventListener(
  'input',
  throttle(event => {
    formValue[event.target.name] = event.target.value;
    localStorage.setItem('feedback-form-state', JSON.stringify(formValue));
  }, 500)
);

formRef.addEventListener('submit', event => {
  event.preventDefault();
  console.log(formValue);
  localStorage.removeItem('feedback-form-state');
  emailInputRef.value = '';
  messageInputRef.value = '';
});
