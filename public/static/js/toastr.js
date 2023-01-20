class Toastr {
  constructor() {
    // Create the toastr container
    this.container = document.createElement('div');
    this.container.classList.add('toastr-container');
    this.container.style.position = 'fixed';
    this.container.style.top = '20px';
    this.container.style.right = '20px';

    // Add the container to the beginning of the body
    document.body.appendChild(this.container);
  }
}

module.exports = Toastr;
