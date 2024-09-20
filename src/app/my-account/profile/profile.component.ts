import { Component, ElementRef, Inject, NgZone, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
import Swal from 'sweetalert2';
declare var $: any;
import { environment } from '../../../environments/environment'
import { ConfirmPasswordValidator } from '../../auth/confirm-password.validator';
import { MasterService } from '../../service/master.service';
import { filter } from 'rxjs';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { Loader } from '@googlemaps/js-api-loader';
import { DirectionsService } from '../../service/directions.service';






@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  basePath: any = environment.BaseLimsApiUrl
  patientForm: FormGroup
  submitted: boolean = false
  patients: any = []
  bloodGroup: any = []
  patientId: any
  isEdit: boolean = false
  userfname: any = ''
  userlname: any = ''
  isLandmark: boolean = false
  addressForm: FormGroup
  addressItems: any = []
  user_email: any = ''
  defaultImg: boolean = false

  imageUrl: string | ArrayBuffer | null = null;
  cardImageBase64: string;
  previewImagePath: any;
  resetForm: FormGroup
  isLandmarkName: string = 'Home'
  addrId: any
  profileImg: any
  mediaUrl = environment.LimsEndpointBase
  coins: any
  submitte: boolean = false
  isLoadData: boolean = false
  isPatientLoadData: boolean = false
  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  mobile: any = ''
  dob: any
  profileEdit: boolean = false
  loadingBtn: boolean = false
  altEmail: any = ''
  @ViewChild('search')
  public searchElementRef!: ElementRef;
  lat: any = ''
  long: any = ''

  form = {
    schemaName: "nir1691144565",
    user_id: null,
    first_name: '',
    last_name: '',
    mobileNumber: '',
    recovery_email: '',
    dob: ''
  };
  image: any;
  address: string = '';


  center: google.maps.LatLngLiteral = { lat: 22.9868, lng: 87.8550 };
  zoom = 8;

  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @ViewChild('mapContainer2', { static: false }) mapContainer2!: ElementRef;

  map!: google.maps.Map;
  marker!: google.maps.Marker;

  constructor(
    private _fb: FormBuilder,
    private _profile: ProfileService,
    private _router: Router,
    private _master: MasterService,
    private viewportScroller: ViewportScroller,
    @Inject(PLATFORM_ID) private platformId: Object,
    private geolocationService: DirectionsService
  ) {
    this.patientForm = this._fb.group({
      schemaName: ['nir1691144565'],
      user_id: [''],
      patientTitle: ['', Validators.required],
      patientName: ['', Validators.required],
      profilePicture: [''],
      dob: ['', Validators.required],
      age: [{ value: '', disabled: true }],
      blood_group: ['', Validators.required],
      gender: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
    })

    this.addressForm = this._fb.group({
      schemaName: ['nir1691144565'],
      user_id: [''],
      addressName: ['', Validators.required],
      fullName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      alt_contactNumber: [null],
      pinCode: ['', Validators.required],
      state: [0, Validators.required],
      city: ['', Validators.required],
      addressLine_1: ['', Validators.required],
      addressLine_2: ['', Validators.required],
      landMark: [null, ''],
      latitude: null,
      longitude: null
    })

    this.resetForm = this._fb.group({
      schemaName: 'nir1691144565',
      user_email: ['', [Validators.required, Validators.email]],
      old_password: ['', Validators.required],
      new_password: ['', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]],
      confirm_password: ['', Validators.required]
    },
      {
        validator: ConfirmPasswordValidator("new_password", "confirm_password")
      })
  }

  get f() { return this.resetForm.controls; }

  get userEmail() {
    return this.resetForm.get('user_email')
  }

  get passwordFormField() {
    return this.resetForm.get('new_password');
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      //load Places Autocomplete
      let payload = {
        schemaName: 'nir1691144565',
        user_id: Number(localStorage.getItem('USER_ID'))
      }
      this._profile.getPatient(payload).subscribe((res: any) => {
        if (res.status == 1) {
          this.patients = res.data
        }
        else if (res.status == 503 || res.status == 403) {
          // localStorage.clear();
          this._router.navigate(['/auth/login'])
        }
      })

      this.getAllAddress();

      this._profile.getBloodGroup().subscribe((res: any) => {
        if (res.status == 1) {
          this.bloodGroup = res.data
        }
      });

      $(document).ready(function () {
        $('.profCam').on('click', function () {
          $('.profCamEdit').toggleClass("open");
        });
      });

      this._router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        // Scroll to the anchor after navigation ends
        const fragment = this._router.getCurrentNavigation()?.extras?.fragment;
        if (fragment) {
          setTimeout(() => {
            this.scrollToAnchorWithOffset(fragment, 120);
          }, 300); // Adjust delay as needed
        }
      });
      this.getProfile()
      this.getMyCoins()
      this.getCurrentLocation()

    }
  }


  private scrollToAnchorWithOffset(anchor: string, offset: number) {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(anchor);
      if (element) {
        const yPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: yPosition, behavior: 'smooth' });
      }
    }
  }

  onSubmit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadingBtn = true
      this._profile.updateProfile(this.form).subscribe((res: any) => {
        this.loadingBtn = false
        if (res.status == 1) {
          Swal.fire({
            icon: 'success',
            text: 'Profile Updated Successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.getProfile()
          this.profileEdit = false
        } else {
          Swal.fire({
            icon: 'error',
            text: res.data,
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }
  }

  //   //New code************************
  // onSubmit() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.loadingBtn = true;
  
  //     // Trigger validation only for the patientForm
  //     if (this.patientForm.valid) {
  //       this._profile.updateProfile(this.patientForm.value).subscribe((res: any) => {
  //         this.loadingBtn = false;
  //         if (res.status == 1) {
  //           Swal.fire({
  //             icon: 'success',
  //             text: 'Profile Updated Successfully',
  //             showConfirmButton: false,
  //             timer: 1500
  //           });
  //           this.getProfile();
  //           this.profileEdit = false;
  //         } else {
  //           Swal.fire({
  //             icon: 'error',
  //             text: res.data,
  //             showConfirmButton: false,
  //             timer: 1500
  //           });
  //         }
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: "Please fill all required fields!",
  //       });
  //       this.loadingBtn = false; // Ensure loading button stops
  //     }
  //   }
  // }
  
  getProfile() {
    if (isPlatformBrowser(this.platformId)) {
      let userid = localStorage.getItem('USER_ID')
      this._profile.getProfileData(userid).subscribe((res: any) => {
        if (res.status == 1) {
          this.form.first_name = res.data.first_name
          this.form.last_name = res.data.last_name
          this.form.mobileNumber = res.data.mobileNumber
          this.form.user_id = res.data.id
          this.form.recovery_email = res.data.recovery_email
          let dobISO = res.data.dob; // This is the date in ISO format
          let dob = new Date(dobISO); // Convert ISO string to Date object
          // Format the date as "yyyy-MM-dd"
          let year = dob.getFullYear().toString();
          let month = (dob.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
          let day = dob.getDate().toString().padStart(2, '0');
          let formattedDob = `${year}-${month}-${day}`;
          this.form.dob = formattedDob
          this.mobile = res.data.mobileNumber
          this.userfname = res.data.first_name
          this.userlname = res.data.last_name
          this.user_email = res.data.email
          this.altEmail = res.data.recovery_email
          this.profileImg = res.data.profile_picture
          localStorage.setItem('USER_NAME', res.data.user_name)
          localStorage.setItem('PROFILE_IMG', res.data.profile_picture)
          this._profile.sendHeaderImg(res.data.profile_picture)
        }
      })
    }
  }

  clickme(i: any) {
    if (isPlatformBrowser(this.platformId)) {
      $('#ifff' + i).toggleClass("oppn");
    }
  }

  onDateChange(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      const selectedDate = new Date(event.target.value);
      const age = this.calculateAge(selectedDate);
      this.patientForm.controls['age'].setValue(`${age.years}Y- ${age.months}M- ${age.days}D`);
    }
  }

  calculateAge(birthDate: Date): { years: number, months: number, days: number } {
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // Get last month's days
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  }


  // savePatient() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     let patientId: any
  //     this.submitted = true
  //     let userId = localStorage.getItem('USER_ID')
  //     let form = this.patientForm.value
  //     // Extract only the year part from the age
  //     const ageString = $('#totalAge').val();
  //     const ageYears = ageString.split('Y');
  //     let payload = {
  //       "schemaName": "nir1691144565",
  //       "user_id": Number(userId),
  //       "patientName": form.patientName,
  //       "age": Number(ageYears[0]),
  //       "blood_group": Number(form.blood_group),
  //       "gender": Number(form.gender),
  //       "dob": form.dob,
  //       "height": Number(form.height),
  //       "weight": Number(form.weight),
  //       "title": form.patientTitle,
  //     }

  //     if (this.patientForm.valid) {
  //       this.isPatientLoadData = true
  //       this._profile.storePatient(payload).subscribe((res: any) => {
  //         this.isPatientLoadData = false
  //         if (res.status == 1) {
  //           Swal.fire({
  //             position: 'center',
  //             icon: 'success',
  //             text: 'Added Successfully!',
  //             showConfirmButton: false,
  //             timer: 1500
  //           })
  //           this.patientProfilePicture(res)

  //           $("#patientModal").hide();
  //           $('body').removeClass('modal-open');
  //           $(".modal-backdrop").removeClass("modal-backdrop show");
  //           this.ngOnInit()
  //         }
  //         else if (res.status == 503 || res.status == 403) {
  //           $(".modal-backdrop").removeClass("modal-backdrop show");
  //           // localStorage.clear();
  //           this._router.navigate(['/auth/login'])
  //         }
  //         else if (res.status == 2) {
  //           Swal.fire({
  //             position: 'center',
  //             icon: 'success',
  //             text: 'Added Successfully!',
  //             showConfirmButton: false,
  //             timer: 1500
  //           })

  //           this.patientProfilePicture(res)

  //           $("#patientModal").hide();
  //           $('body').removeClass('modal-open');
  //           $(".modal-backdrop").removeClass("modal-backdrop show");
  //           this.ngOnInit()
  //         }
  //         else {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Oops...',
  //             text: 'Something went wrong!',
  //           })
  //         }
  //       })
  //     }
  //   }
  // }
  
  // New savePatient code****************
  savePatient() {
    if (isPlatformBrowser(this.platformId)) {
      this.submitted = true;
  
      // Extract form values
      let form = this.patientForm.value;
      let userId = localStorage.getItem('USER_ID');
  
      // Extract age value
      const ageString = $('#totalAge').val();
      const ageYears = ageString ? ageString.split('Y')[0] : 0;
  
      // Construct payload for submission
      let payload = {
        "schemaName": "nir1691144565",
        "user_id": Number(userId),
        "patientName": form.patientName,
        "age": Number(ageYears),
        "blood_group": Number(form.blood_group),
        "gender": Number(form.gender),
        "dob": form.dob,
        "height": Number(form.height),
        "weight": Number(form.weight),
        "title": form.patientTitle,
      };
  
      // Only submit if the form is valid
      if (this.patientForm.valid) {
        this.isPatientLoadData = true;
        this._profile.storePatient(payload).subscribe((res: any) => {
          this.isPatientLoadData = false;
          if (res.status == 1 || res.status == 2) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              text: 'Patient added successfully!',
              showConfirmButton: false,
              timer: 1500
            });
            this.patientProfilePicture(res); // Handle profile picture if needed
  
            $("#patientModal").hide();
            $('body').removeClass('modal-open');
            $(".modal-backdrop").removeClass("modal-backdrop show");
            this.ngOnInit(); // Refresh data
          } else if (res.status == 503 || res.status == 403) {
            this._router.navigate(['/auth/login']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill all required fields!',
        });
      }
    }
  }
  

  editPatient(id: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.isEdit = true
      this.patientId = id
      let payload = {
        "schemaName": "nir1691144565",
        "patient_id": id
      }
      this.isPatientLoadData = true
      this._profile.getPatientById(payload).subscribe((res: any) => {
        this.isPatientLoadData = false
        if (res.status == 1) {
          this.patientForm.get("patientName").setValue(res.data.patient_name);
          this.patientForm.get("patientTitle").setValue(res.data.title);
          this.patientForm.get("age").setValue(res.data.age);
          this.patientForm.get("blood_group").setValue(res.data.blood_group);
          this.patientForm.get("gender").setValue(res.data.gender);
          this.patientForm.get("dob").setValue(res.data.dob);
          this.patientForm.get("height").setValue(res.data.height);
          this.patientForm.get("weight").setValue(res.data.weight);
          this.imageUrl = this.basePath + res.data.patient_profile
        }
      })
    }
  }

  updatePatient() {
    if (isPlatformBrowser(this.platformId)) {
      this.submitted = true
      let form = this.patientForm.value
      const ageString = $('#totalAge').val();
      const ageYears = ageString.split('Y');
      let payload = {
        "schemaName": "nir1691144565",
        "patient_id": Number(this.patientId),
        "title": form.patientTitle,
        "patientName": form.patientName,
        "age": Number(ageYears[0]),
        "blood_group": Number(form.blood_group),
        "gender": Number(form.gender),
        "dob": form.dob,
        "height": Number(form.height),
        "weight": Number(form.weight)
      }
      if (this.patientForm.valid) {
        this.isPatientLoadData = true
        this._profile.updatePatients(payload).subscribe((res: any) => {
          this.isPatientLoadData = false
          if (res.status == 1) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              text: 'Added Successfully!',
              showConfirmButton: false,
              timer: 1500
            })
            if (this.image as Blob) {
              this.editProfilePicture(Number(this.patientId))
            }
            $("#patientModal").hide();
            $('body').removeClass('modal-open');
            $(".modal-backdrop").removeClass("modal-backdrop show");
            this.ngOnInit();
            this.isEdit = false
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }
        })
      }
    }
  }

  deleteItem(id: any) {
    if (isPlatformBrowser(this.platformId)) {
      let payload = {
        "schemaName": "nir1691144565",
        "patient_id": id
      }

      Swal.fire({
        title: 'Are you sure?',
        text: "You want to remove this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Remove'
      }).then((result) => {
        if (result.isConfirmed) {
          this._profile.deletePatient(payload).subscribe((res: any) => {
            if (res.status == 1) {
              this.ngOnInit()
            }
          })
        }
      })
    }
  }

  // addAddressFunc() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.addressForm.reset()
  //   }
  // }

  //New code************************ 
  addAddressFunc() {
    if (isPlatformBrowser(this.platformId)) {
      this.addressForm.reset();
      this.submitted = false; // Reset the submission state for address form
    }
  }
  
  // addPatient() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.patientForm.reset()
  //   }
  // }
  
  // Address Start
  // saveAddress() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.submitted = true
  //     if (this.addressForm.valid) {
  //       this.isLoadData = true
  //       this.addressForm.value['schemaName'] = 'nir1691144565'
  //       this.addressForm.value['pinCode'] = Number(this.addressForm.value['pinCode'])
  //       this.addressForm.value['contactNumber'] = Number(this.addressForm.value['contactNumber'])
  //       this.addressForm.value['alt_contactNumber'] = Number(this.addressForm.value['alt_contactNumber'])
  //       this.addressForm.value['user_id'] = Number(localStorage.getItem('USER_ID'))
  //       this.addressForm.value['latitude'] = this.lat
  //       this.addressForm.value['longitude'] = this.long
  //       delete this.addressForm.value['state']
  //       delete this.addressForm.value['city']
  //       this._profile.storeAddress(this.addressForm.value).subscribe((res: any) => {
  //         this.isLoadData = false
  //         if (res.status == 1) {
  //           Swal.fire({
  //             position: "center",
  //             icon: "success",
  //             text: "Address saved successfully!",
  //             showConfirmButton: false,
  //             timer: 1500
  //           });
  //           this.addressForm.reset()
  //           this.getAllAddress()
  //           this.ngOnInit()
  //           $("#addressModal").hide();
  //           $('body').removeClass('modal-open');
  //           $(".modal-backdrop").removeClass("modal-backdrop show");
  //         } else {
  //           Swal.fire({
  //             icon: "error",
  //             title: "Oops...",
  //             text: res.data,
  //           });
  //         }
  //       })
  //     } else if (this.center.lat == 0) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: "Please select a location!",
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: "Please fill all required fields!",
  //       });
  //     }
  //   }
  // }

    //New code************************
  addPatient() {
    if (isPlatformBrowser(this.platformId)) {
      this.patientForm.reset();
      this.submitted = false; // Reset the submission state for patient form
    }
  }
  states:boolean = false
  getPincode(event:any){
    const pincode = event.target.value;
    if(pincode.length == '6'){
      this._profile.getLocationByPincode(Number(pincode)).subscribe((res: any) => {
        if (res.status == 1) {
          this.states = true
          this.addressForm.get("state").setValue(res.data.stateName)
        }
      })
    }
  }
    //New code************************
  saveAddress() {
    if (isPlatformBrowser(this.platformId)) {
      this.submitted = true;
  
      // Trigger validation only for the addressForm
      if (this.addressForm.valid) {
        this.isLoadData = true;
        const addressData = this.addressForm.value;
  
        addressData['schemaName'] = 'nir1691144565';
        addressData['pinCode'] = Number(addressData['pinCode']);
        addressData['contactNumber'] = Number(addressData['contactNumber']);
        addressData['alt_contactNumber'] = Number(addressData['alt_contactNumber']);
        addressData['user_id'] = Number(localStorage.getItem('USER_ID'));
        addressData['latitude'] = this.lat;
        addressData['longitude'] = this.long;
  
        delete addressData['state'];
        delete addressData['city'];
  
        this._profile.storeAddress(addressData).subscribe((res: any) => {
          this.isLoadData = false;
          if (res.status == 1) {
            Swal.fire({
              position: "center",
              icon: "success",
              text: "Address saved successfully!",
              showConfirmButton: false,
              timer: 1500
            });
            this.addressForm.reset();
            this.getAllAddress();
            this.ngOnInit();
            $("#addressModal").hide();
            $('body').removeClass('modal-open');
            $(".modal-backdrop").removeClass("modal-backdrop show");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: res.data,
            });
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill all required fields!",
        });
      }
    }
  }

  getAllAddress() {
    if (isPlatformBrowser(this.platformId)) {
      let payload = {
        "schemaName": "nir1691144565",
        "user_id": localStorage.getItem('USER_ID')
      }
      this._profile.getAddress(payload).subscribe((res: any) => {
        if (res.status == 1) {
          this.addressItems = res.data
        }
      })

      // this.getLatLong()
    }
  }

  removeProfle() {
    if (isPlatformBrowser(this.platformId)) {
      let formData = new FormData();
      formData.append('schemaName', 'nir1691144565');
      formData.append('user_id', localStorage.getItem('USER_ID'));
      formData.append('profile_picture', null);

      this._profile.storeProfileImg(formData).subscribe((res: any) => {
        if (res.status == 1) {
          this.cardImageBase64 = null
          Swal.fire({
            position: "center",
            text: "Profile has been changed!",
            showConfirmButton: false,
            timer: 1500
          });
          window.location.reload();
        }
      })
    }
  }

  profileChange(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      if (event.target.files && event.target.files.length > 0) {
        for (let i = 0; i < event.target.files.length; i++) {
          const file = event.target.files[i];
          if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
            // Create an HTMLImageElement
            const img = new Image();
            img.src = URL.createObjectURL(file);

            // On image load, resize and push to array
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              // Set the canvas dimensions to the resized image
              const maxWidth = 800; // Adjust as needed
              const maxHeight = 600; // Adjust as needed
              let width = img.width;
              let height = img.height;

              if (width > height) {
                if (width > maxWidth) {
                  height *= maxWidth / width;
                  width = maxWidth;
                }
              } else {
                if (height > maxHeight) {
                  width *= maxHeight / height;
                  height = maxHeight;
                }
              }

              canvas.width = width;
              canvas.height = height;

              // Draw image on canvas
              ctx.drawImage(img, 0, 0, width, height);

              // Convert canvas to Blob
              canvas.toBlob((blob) => {
                const resizedFile = new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() });

                // Convert resized image to base64
                const reader = new FileReader();
                reader.onload = (e: any) => {
                  const imgBase64Path = e.target.result;
                  this.cardImageBase64 = imgBase64Path;

                  // Prepare form data
                  let formData = new FormData();
                  formData.append('schemaName', 'nir1691144565');
                  formData.append('user_id', localStorage.getItem('USER_ID'));
                  formData.append('profile_picture', resizedFile);

                  // Send the form data to the server
                  this._profile.storeProfileImg(formData).subscribe((res: any) => {
                    if (res.status == 1) {
                      this.cardImageBase64 = null;
                      Swal.fire({
                        position: "center",
                        icon: "success",
                        text: "Profile changed successfully",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      this.getProfile();
                    }
                  });
                };
                reader.readAsDataURL(resizedFile);
              }, 'image/jpeg', 0.9); // Adjust quality as needed
            };
          } else {
            Swal.fire({
              icon: "error",
              title: "Sorry...",
              text: `Only PNG, JPG, and JPEG images are allowed!`,
            });
          }
        }
      }
    }
  }


  deleteProfilePic() {
    if (isPlatformBrowser(this.platformId)) {
      const formData = new FormData();
      formData.append('schemaName', 'nir1691144565');
      formData.append('user_id', localStorage.getItem('USER_ID'));
      formData.append('profile_picture', null);
      this._profile.storeProfileImg(formData).subscribe((res: any) => {
        if (res.status == 1) {
          this.cardImageBase64 = null;
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Profile picture deleted successfully",
            showConfirmButton: false,
            timer: 1500
          });
          this.getProfile();
        } else {
          Swal.fire({
            icon: "error",
            title: "Sorry...",
            text: "Failed to delete profile picture",
          });
        }
      });
    }
  }


  // Get Coins
  getMyCoins() {
    if (isPlatformBrowser(this.platformId)) {
      let payload = {
        "schemaName": "nir1691144565",
        "userID": localStorage.getItem('USER_ID')
      }
      this._profile.getCoins(payload).subscribe((res: any) => {
        if (res.status == 1) {
          this.coins = res.data
        }
      })
    }
  }


  editAddr(id: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.isEdit = true
      this.addrId = id
      let payload = {
        "schemaName": "nir1691144565",
        "addressID": id
      }
      this.isLoadData = true
      this._profile.getAddressById(payload).subscribe((res: any) => {
        this.isLoadData = false
        if (res.status == 1) {
          // this.patientForm.get("addressName").setValue(res.data[0].addressName);
          this.addressForm.get("fullName").setValue(res.data[0].fullName);
          this.addressForm.get("contactNumber").setValue(res.data[0].contactNumber);
          this.addressForm.get("alt_contactNumber").setValue(res.data[0].alt_contactNumber);
          this.addressForm.get("pinCode").setValue(res.data[0].pinCode);
          this.addressForm.get("state").setValue(res.data[0].stateName);
          this.addressForm.get("city").setValue(res.data[0].city);
          this.addressForm.get("addressLine_1").setValue(res.data[0].addressLine_1);
          this.addressForm.get("addressLine_2").setValue(res.data[0].addressLine_2);
          this.addressForm.get("landMark").setValue(res.data[0].landMark);
          this.isLandmarkName = res.data[0].addressName

        }
      })
    }
  }

  updateAddress() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.addressForm.valid) {
        this.isLoadData = true
        this.addressForm.value['schemaName'] = 'nir1691144565'
        this.addressForm.value['user_id'] = Number(localStorage.getItem('USER_ID'))
        this.addressForm.value['addressID'] = this.addrId
        this.addressForm.value['contactNumber'] = Number($('#mobile').val())
        this.addressForm.value['alt_contactNumber'] = Number($('#alt_mobile').val())
        this.addressForm.value['latitude'] = this.lat
        this.addressForm.value['longitude'] = this.long
        this._profile.updateAddress(this.addressForm.value).subscribe((res: any) => {
          this.isLoadData = false
          if (res.status == 1) {
            Swal.fire({
              position: "center",
              icon: "success",
              text: "Updated successfully !",
              showConfirmButton: false,
              timer: 1500
            });
            this.isEdit = false
            $("#addressModal").hide();
            $('body').removeClass('modal-open');
            $(".modal-backdrop").removeClass("modal-backdrop show");
            this.ngOnInit();
          }
          else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        })
      } else if(!this.center.lat) {
        alert("Please select Map Location")
      }
    }
  }

  deleteAddrs(id: any) {
    if (isPlatformBrowser(this.platformId)) {
      let payload = {
        "schemaName": "nir1691144565",
        "addressID": id
      }
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this._profile.deleteAddr(payload).subscribe((res: any) => {
            if (res.status == 1) {
              this.ngOnInit()
            }
          })
        }
      });
    }
  }

  submitReset() {
    if (isPlatformBrowser(this.platformId)) {
      this.submitte = true
      if (this.resetForm.valid) {
        this._profile.resetPassword(this.resetForm.value).subscribe((res: any) => {
          if (res.status == 1) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your password has been changed!",
              showConfirmButton: false,
              timer: 1500
            });
            this.ngOnInit()
            this.resetForm.reset()
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: res.data,
            });
          }
        })
      }
    }
  }

  passwordVisible = false;
  confpasswordVisible = false;
  togglePasswordVisibility(msg: any): void {
    if (isPlatformBrowser(this.platformId)) {
      if (msg == 'new') {
        this.passwordVisible = !this.passwordVisible;
      } else {
        this.confpasswordVisible = !this.confpasswordVisible;
      }
    }
  }

  onImageChange(event: Event): void {
    if (isPlatformBrowser(this.platformId)) {
      const inputElement = event.target as HTMLInputElement;
      const files = inputElement.files;
      const maxWidth = 800;
      const maxHeight = 600;

      if (files && files.length > 0) {
        const file = files[0];
        const validImageTypes = ['image/png', 'image/jpg', 'image/jpeg'];

        if (validImageTypes.includes(file.type)) {
          this.processImage(file, maxWidth, maxHeight);
        } else {
          console.log('Please select a valid image file (PNG, JPG, or JPEG)');
        }
      } else {
        console.log('No files selected');
      }
    }
  }

  private processImage(file: File, maxWidth: number, maxHeight: number): void {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const img = new Image();
      img.onload = () => {
        const [width, height] = this.calculateDimensions(img, maxWidth, maxHeight);
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() });
            this.readResizedImage(resizedFile);
          }
        }, 'image/jpeg', 0.7);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  private calculateDimensions(img: HTMLImageElement, maxWidth: number, maxHeight: number): [number, number] {
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }

    return [width, height];
  }

  private readResizedImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.imageUrl = e.target?.result as string;
      this.image = file;
      this.patientForm.patchValue({ profilePicture: file });
    };
    reader.readAsDataURL(file);
  }
  resetFormAndImage() {
    this.patientForm.patchValue({ profilePicture: null });
  }
  patientProfilePicture(res: any) {
    if (isPlatformBrowser(this.platformId)) {
      const formData = new FormData();
      formData.append('schemaName', "nir1691144565");
      formData.append('patient_id', res.patient_id[0].id);
      formData.append('patient_profile', this.image as Blob);

      this._master.getChangePatientProfilePicture(formData).subscribe((res: any) => {
        console.log(res.data);
        this.imageUrl = null;
        this.ngOnInit();
      })
    }
  }
  editProfilePicture(res: any) {
    if (isPlatformBrowser(this.platformId)) {
      const formData = new FormData();
      formData.append('schemaName', "nir1691144565");
      formData.append('patient_id', res);
      formData.append('patient_profile', this.image as Blob);

      this._master.getChangePatientProfilePicture(formData).subscribe((res: any) => {
        console.log(res.data);
        this.imageUrl = null;
        this.ngOnInit();
      })
    }
  }


errorMessage:any = ''
getCurrentLocation() {
  this.geolocationService.getCurrentPosition().subscribe({
    next: (position) => {
      // this.lat = position.coords.latitude;
      // this.long = position.coords.longitude;
      this.center.lat = position.coords.latitude
      this.center.lng = position.coords.longitude

    // Initialize the map
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: this.center,
      zoom: this.zoom,
    });
    // Initialize the marker
    this.marker = new google.maps.Marker({
      position: this.center,
      map: this.map,
      title: 'Click to get lat/lng',
    });

    // Add click event listener to the map
    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        this.marker.setPosition(event.latLng);
        console.log(`Clicked location: Latitude: ${event.latLng.lat()}, Longitude: ${event.latLng.lng()}`);
        alert(`Latitude: ${event.latLng.lat()}, Longitude: ${event.latLng.lng()}`);
        this.lat = `${event.latLng.lat()}`
        this.long = `${event.latLng.lng()}`
      }
    });
    },
    error: (error) => {
      this.errorMessage = `Error getting location: ${error.message}`;
    }
  });
}

}
