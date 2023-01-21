export class Toastr {
    constructor(message, severity) {
      // Create the toastr container
      this.toastr = document.createElement("div");
      this.toastr.classList.add("toastr");
  
      const icon = document.createElement("i");
  
      switch (severity) {
        case "success":
          icon.classList.add("fa");
          icon.classList.add("fa-check");
          this.toastr.style.backgroundColor = 'green';
          break;
        case "error":
          icon.classList.add("fa-solid");
          icon.classList.add("fa-shield-xmark");
          this.toastr.style.backgroundColor = 'red';
          break;
        case "info":
          icon.classList.add("fa-solid");
          icon.classList.add("fa-circle-info");
          this.toastr.style.backgroundColor = '#146EBE';
          break;
        default:
          icon.classList.add("fa");
          icon.classList.add("fa-check");
          this.toastr.style.backgroundColor = 'red';
          break;
      }
  
      this.toastr.appendChild(icon);
  
      const content = document.createElement("p");
      content.textContent = message;
  
      this.toastr.appendChild(content);
  
      // Add the container to the beginning of the body
      document.body.appendChild(this.toastr);
  
      setTimeout(() => {
        this.toastr.remove();
      }, 3000);
    }
  }