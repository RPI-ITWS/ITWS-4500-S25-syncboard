const Signup = () => {
  const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      rin: '',
      year: '',
      major: '',
      password: ''
  });

  const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await fetch('/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });

          const data = await response.json();
          if (response.ok) {
              alert('Signup successful! Redirecting to login...');
              window.location.href = './login.html';
          } else {
              alert(`Signup failed: ${data.error}`);
          }
      } catch (error) {
          console.error('Error signing up:', error);
          alert('An error occurred. Please try again.');
      }
  };

  return (
      <div className="container">
         
          <div className="welcome-text">Welcome to SyncBoard!</div>
          <form className="signup-container" onSubmit={handleSubmit}>
              <div className="login-title">Sign Up</div>
              {['name', 'email', 'rin', 'year', 'major', 'password'].map((field, index) => (
                  <div className="input-group" key={index}>
                      <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                      <input
                          type={field === 'password' ? 'password' : 'text'}
                          id={field}
                          placeholder={`Enter your ${field}`}
                          value={formData[field]}
                          onChange={handleChange}
                      />
                  </div>
              ))}
              <button className="sign-in-btn" type="submit">Sign Up</button>
              <ReactRouterDOM.Link to="/">
               <button className="sign-up-btn" type="button">
                     Already have an account? Log in!
               </button>
              </ReactRouterDOM.Link>
          </form>
      </div>
  );
};

const rootElement = document.getElementById('signup-root');
ReactDOM.createRoot(rootElement).render(<Signup />);
