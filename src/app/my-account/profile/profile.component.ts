import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ProfileService } from 'src/app/service/profile.service';
import Swal from 'sweetalert2';
declare var $: any;
import { environment } from 'src/environments/environment.prod'
import { ConfirmPasswordValidator } from 'src/app/auth/confirm-password.validator';



import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Icon, Style } from 'ol/style';
import { MasterService } from 'src/app/service/master.service';
import { filter } from 'rxjs';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  basePath:any = environment.BaseLimsApiUrl
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

  map: Map;
  imageUrl: string | ArrayBuffer | null = null;
  cardImageBase64: string;
  previewImagePath: any;
  resetForm: FormGroup
  isLandmarkName: any
  addrId: any
  profileImg: any
  mediaUrl = environment.LimsEndpointBase
  coins: any
  submitte: boolean = false
  isLoadData: boolean = false
  isPatientLoadData: boolean = false
  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  mobile: any = ''
  dob:any
  profileEdit: boolean = false
  loadingBtn: boolean = false
  altEmail: any = ''
  @ViewChild('search')
  public searchElementRef!: ElementRef;

  form = {
    schemaName: "nir1691144565",
    user_id: null,
    first_name: '',
    last_name: '',
    mobileNumber: '',
    recovery_email: '',
    dob:''
  };
  image: any;


  constructor(
    private _fb: FormBuilder,
    private _profile: ProfileService,
    private _router: Router,
    private _master:MasterService,
    private viewportScroller:ViewportScroller
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
      alt_contactNumber: [null, ''],
      pinCode: ['', Validators.required],
      state: ['' , Validators.required],
      city: ['' , Validators.required],
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
    this.getLocationMap()
    this.getCurrentLocation()

  }

  private scrollToAnchorWithOffset(anchor: string, offset: number) {
    const element = document.getElementById(anchor);
    if (element) {
      const yPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }
  }

  onSubmit() {
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

  getProfile() {
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
        this.dob = formattedDob
        this.mobile = res.data.mobileNumber
        this.userfname = res.data.first_name
        this.userlname = res.data.last_name
        this.user_email = res.data.email
        this.altEmail = res.data.recovery_email
        this.profileImg = res.data.profile_picture
        localStorage.setItem('USER_NAME',res.data.user_name)
        localStorage.setItem('PROFILE_IMG', res.data.profile_picture)
        this._profile.sendHeaderImg(res.data.profile_picture)
      }
    })
  }
  
  clickme(i: any) {
    $('#ifff' + i).toggleClass("oppn");
  }

  onDateChange(event: any) {
    const selectedDate = new Date(event.target.value);
    const age = this.calculateAge(selectedDate);
    this.patientForm.controls['age'].setValue(`${age.years}Y- ${age.months}M- ${age.days}D`);
  }

  calculateAge(birthDate: Date): { years: number, months: number, days: number } {
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days };
  }

  savePatient() {
    let patientId:any
    this.submitted = true
    let userId = localStorage.getItem('USER_ID')
    let form = this.patientForm.value
    // Extract only the year part from the age
    const ageString = $('#totalAge').val();
    const ageYears = ageString.split('Y');
    let payload = {
      "schemaName": "nir1691144565",
      "user_id": Number(userId),
      "patientName": form.patientName,
      "age": Number(ageYears[0]),
      "blood_group": Number(form.blood_group),
      "gender": Number(form.gender),
      "dob": form.dob,
      "height": Number(form.height),
      "weight": Number(form.weight),
      "title": form.patientTitle,
    }

    if (this.patientForm.valid) {
      this.isPatientLoadData = true
      this._profile.storePatient(payload).subscribe((res: any) => {
        this.isPatientLoadData = false
        if (res.status == 1) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Added Successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          this.patientProfilePicture(res)

          $("#patientModal").hide();
          $('body').removeClass('modal-open');
          $(".modal-backdrop").removeClass("modal-backdrop show");
          this.ngOnInit()
        }
        else if (res.status == 503 || res.status == 403) {
          $(".modal-backdrop").removeClass("modal-backdrop show");
          // localStorage.clear();
          this._router.navigate(['/auth/login'])
        }
        else if (res.status == 2) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Added Successfully!',
            showConfirmButton: false,
            timer: 1500
          })

          this.patientProfilePicture(res)
          
          $("#patientModal").hide();
          $('body').removeClass('modal-open');
          $(".modal-backdrop").removeClass("modal-backdrop show");
          this.ngOnInit()
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      })
    }
  }

  editPatient(id: any) {
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

  updatePatient() {
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
          this.editProfilePicture(Number(this.patientId))
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

  deleteItem(id: any) {
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

  addAddressFunc() {
    this.addressForm.reset()
  }

  addPatient() {
    this.patientForm.reset()
  }
  // Address Start
  saveAddress() {
    this.submitted = true
    if (this.addressForm.valid) {
      this.isLoadData = true
      this.addressForm.value['schemaName'] = 'nir1691144565'
      this.addressForm.value['pinCode'] = Number(this.addressForm.value['pinCode'])
      this.addressForm.value['contactNumber'] = Number(this.addressForm.value['contactNumber'])
      this.addressForm.value['alt_contactNumber'] = Number(this.addressForm.value['alt_contactNumber'])
      this.addressForm.value['user_id'] = Number(localStorage.getItem('USER_ID'))
      delete this.addressForm.value['state']
      delete this.addressForm.value['city']
      this._profile.storeAddress(this.addressForm.value).subscribe((res: any) => {
        this.isLoadData = false
        if (res.status == 1) {
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Address saved successfully!",
            showConfirmButton: false,
            timer: 1500
          });
          this.addressForm.reset()
          this.getAllAddress()
          this.ngOnInit()
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
      })
    }
  }

  getAllAddress() {
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

  removeProfle() {
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

  profileChange(event: any) {
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
  
  
  deleteProfilePic() {
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
  

  // Get Coins
  getMyCoins() {
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


  editAddr(id: any) {
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
        this.addressForm.get("state").setValue(res.data[0].state);
        this.addressForm.get("city").setValue(res.data[0].city);
        this.addressForm.get("addressLine_1").setValue(res.data[0].addressLine_1);
        this.addressForm.get("addressLine_2").setValue(res.data[0].addressLine_2);
        this.addressForm.get("landMark").setValue(res.data[0].landMark);
        this.isLandmarkName = res.data[0].addressName

      }
    })
  }

  updateAddress() {
    if (this.addressForm.valid) {
      this.isLoadData = true
      this.addressForm.value['schemaName'] = 'nir1691144565'
      this.addressForm.value['user_id'] = Number(localStorage.getItem('USER_ID'))
      this.addressForm.value['addressID'] = this.addrId
      this.addressForm.value['contactNumber'] = Number($('#mobile').val())
      this.addressForm.value['alt_contactNumber'] = Number($('#alt_mobile').val())
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
    }
  }

  deleteAddrs(id: any) {
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

  submitReset() {
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

  passwordVisible = false;
  confpasswordVisible = false;
  togglePasswordVisibility(msg: any): void {
    if (msg == 'new') {
      this.passwordVisible = !this.passwordVisible;
    } else {
      this.confpasswordVisible = !this.confpasswordVisible;
    }
  }

  // Current location
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
          // You can now use latitude and longitude values as needed
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              console.error('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              console.error('The request to get user location timed out.');
              break;
            case error.code:
              console.error('An unknown error occurred.');
              break;
          }
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  getLocationMap() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([88.3639, 22.5726]), // Kolkata coordinates
        zoom: 12 // Zoom level
      })
    });

    // Add marker
    const marker = new Feature({
      geometry: new Point(fromLonLat([88.3639, 22.5726])) // Kolkata coordinates
    });

    const markerStyle = new Style({
      image: new Icon({
        src: 'assets/images/marker.png',
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        anchor: [0.5, 1],
        scale: 0.1 // Adjust the scale as needed
      })
    });

    marker.setStyle(markerStyle);
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [marker]
      })
    });

    this.map.addLayer(vectorLayer);

    // Listen for map click event
    this.map.on('click', (event) => {
      const coordinate = event.coordinate;
      console.log('Clicked Coordinate:', coordinate);
      // Clear existing markers
      vectorLayer.getSource().clear();
      // Add new marker at clicked coordinate
      const clickedMarker = new Feature({
        geometry: new Point(coordinate)
      });
      clickedMarker.setStyle(markerStyle);
      vectorLayer.getSource().addFeature(clickedMarker);
    });

  }

  onImageChange(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    const maxWidth = 800;  // Adjust as needed
    const maxHeight = 600; // Adjust as needed

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;

        if (regex.test(file.name.toLowerCase())) {
          if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
            // Create an HTMLImageElement
            const img = new Image();
            img.src = URL.createObjectURL(file);

            // On image load, resize and convert to base64
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

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
                  this.imageUrl = imgBase64Path; // Update the image URL to display the image

                  // Store the resized file for later use
                  this.image = resizedFile;
                };
                reader.readAsDataURL(resizedFile);
              }, 'image/jpeg');
            };
          } else {
            inputElement.value = ''; // Reset the file input
            console.log('Please select a valid image file');
          }
        } else {
          inputElement.value = ''; // Reset the file input
          console.log('Please select an image file');
        }
      }
    } else {
      console.log('No files selected');
    }
  }

patientProfilePicture(res:any){
   const formData = new FormData();
   formData.append('schemaName', "nir1691144565");
   formData.append('patient_id', res.patient_id[0].id);
   formData.append('patient_profile',  this.image as Blob);
          
  this._master.getChangePatientProfilePicture(formData).subscribe((res:any)=>{
    console.log(res.data);
    this.imageUrl = null;
    this.ngOnInit();
   })
}
editProfilePicture(res:any){
   const formData = new FormData();
   formData.append('schemaName', "nir1691144565");
   formData.append('patient_id', res);
   formData.append('patient_profile',  this.image as Blob);
          
  this._master.getChangePatientProfilePicture(formData).subscribe((res:any)=>{
    console.log(res.data);
    this.imageUrl = null;
    this.ngOnInit();
   })
}

}
