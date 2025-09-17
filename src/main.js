// Main entry point - handles Module Federation bootstrap
// This prevents "Shared module is not available for eager consumption" errors

import('./bootstrap.js')
  .catch(err => {
    console.error('Failed to bootstrap remote application:', err);
    
    // Show error message in the app container
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = 'padding: 20px; background: #f44336; color: white; border-radius: 8px; margin: 20px; font-family: Arial, sans-serif; text-align: center;';
    errorDiv.innerHTML = `
      <h3>Remote App Failed to Load</h3>
      <p>There was an error loading the remote application.</p>
      <small>${err.message}</small>
    `;
    document.body.appendChild(errorDiv);
  });
