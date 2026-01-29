import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress,
  ThemeProvider,
  createTheme,
  CssBaseline,
  FormHelperText,
  Select,
  Checkbox,
  InputAdornment,
} from '@mui/material';

const theme = createTheme({
  typography: {
    h1: { fontSize: '34px' },
    h5: { fontSize: '20px' },
    h6: { fontSize: '16px' },
    body1: { fontSize: '16px' },
    body2: { fontSize: '14px' },
    button: { fontSize: '15px' },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: { width: '100%' },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: { fontSize: '16px' },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: '14px' },
      },
    },
  },
});

// Helper for row layout
const FormRow = ({ children }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
    {React.Children.map(children, (child) => (
      <Box sx={{ flex: 1, minWidth: '250px' }}>
        {child}
      </Box>
    ))}
  </Box>
);

const PHONE_COUNTRIES = [
  { name: 'India', code: '+91', maxLength: 10 },
  { name: 'United States', code: '+1', maxLength: 10 },
  { name: 'United Kingdom', code: '+44', maxLength: 10 },
  { name: 'Australia', code: '+61', maxLength: 9 },
  { name: 'Canada', code: '+1', maxLength: 10 },
];

function App() {
  // --- DATE CALCULATIONS ---
  const today = new Date().toISOString().split('T')[0];
  const d = new Date();
  d.setFullYear(d.getFullYear() - 2);
  const twoYearsAgo = d.toISOString().split('T')[0];
  // -------------------------

  const initialAddress = {
    fullAddress: '',
    country: '',
    state: '',
    district: '',
    city: '',
    area: '',
    pinCode: ''
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    // phone: '',  <-- REMOVED DUPLICATE
    linkedin: '',
    website: '',
    dateOfBirth: '',
    gender: '',
    designation: '',

    startupName: '',
    legalStatus: '',
    dateOfEstablishment: '',
    primarySector: '',
    companyPAN: '',
    currentTeamSize: '',
    maleCount: '',
    femaleCount: '',
    gstin: '',
    companyWebsite: '',
    numberOfBranches: '1',
    branchAddresses: [{ ...initialAddress }],

    founderEmail: '',
    founderFirstName: '',
    founderLastName: '',
    // Founder Phone
    founderPhoneCountry: 'India',
    founderPhoneCode: '+91',
    founderPhone: '',

    founderDOB: '',
    founderGender: '',
    founderLinkedIn: '',
    founderFacebook: '',

    fundingNeeded: '',
    mentorshipNeeded: '',
    technologySupport: '',
    incubationSpace: '',
    registrationNeeded: '',
    supportInterest: '',
    governmentSchemes: '',
    secondarySector: '',

    placementOffered: '',
    placementType: '',
    internshipOffered: '',
    internshipType: '',
    trainingOffered: '',
    trainingType: [],   // Array for multi-select
    fypOffered: '',

    // Applicant Phone
    phoneCountry: 'India',
    phoneCode: '+91',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [countryList, setCountryList] = useState([]);

  const [addressArrays, setAddressArrays] = useState({
    0: { states: [], districts: [], cities: [] }
  });

  const [isLoading, setIsLoading] = useState({
    countries: false, states: false, districts: false, cities: false
  });

  // --- API: Fetch Countries on Load ---
  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(prev => ({ ...prev, countries: true }));
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/iso");
        const data = await response.json();
        if (data.data) {
          setCountryList(data.data.map(c => c.name).sort());
        }
      } catch (error) { console.error(error); }
      setIsLoading(prev => ({ ...prev, countries: false }));
    };
    fetchCountries();
  }, []);

  // --- Handle Number of Branches ---
  const handleBranchCountChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setFormData({
        ...formData,
        numberOfBranches: "",
        branchAddresses: [],
      });
      setErrors((prev) => ({
        ...prev,
        numberOfBranches: "Number of branches is required",
      }));
      return;
    }

    let count = Number(value);

    if (isNaN(count) || count < 1) return;

    if (count > 20) {
      setErrors((prev) => ({
        ...prev,
        numberOfBranches: "Maximum allowed branches is 20",
      }));
      return;
    } else {
      setErrors((prev) => ({
        ...prev,
        numberOfBranches: "",
      }));
    }

    const updatedAddresses = [...formData.branchAddresses];

    if (count > updatedAddresses.length) {
      for (let i = updatedAddresses.length; i < count; i++) {
        updatedAddresses.push({ ...initialAddress });
      }
    } else if (count < updatedAddresses.length) {
      updatedAddresses.length = count;
    }

    setFormData({
      ...formData,
      numberOfBranches: value,
      branchAddresses: updatedAddresses,
    });
  };

  // --- Generic Handler for Address Fields ---
  const handleAddressFieldChange = (index, field, value) => {
    const updatedAddresses = [...formData.branchAddresses];
    updatedAddresses[index] = { ...updatedAddresses[index], [field]: value };
    setFormData({ ...formData, branchAddresses: updatedAddresses });
    if (errors[`address_${index}_${field}`]) {
      setErrors({ ...errors, [`address_${index}_${field}`]: '' });
    }
  };

  // --- API Handlers for Dynamic Addresses ---
  const handleCountryChange = async (index, event) => {
    const selectedCountry = event.target.value;
    const updatedAddresses = [...formData.branchAddresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      country: selectedCountry,
      state: '', district: '', city: '', pinCode: ''
    };
    setFormData({ ...formData, branchAddresses: updatedAddresses });
    setAddressArrays(prev => ({ ...prev, [index]: { states: [], districts: [], cities: [] } }));

    if (selectedCountry) {
      setIsLoading(prev => ({ ...prev, states: true }));
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ country: selectedCountry }),
        });
        const result = await response.json();
        if (result.data?.states) {
          setAddressArrays(prev => ({
            ...prev,
            [index]: { ...prev[index], states: result.data.states.map(s => s.name) }
          }));
        }
      } catch (error) { console.error(error); }
      setIsLoading(prev => ({ ...prev, states: false }));
    }
  };

  const handleStateChange = async (index, event) => {
    const selectedState = event.target.value;
    const currentCountry = formData.branchAddresses[index].country;
    const updatedAddresses = [...formData.branchAddresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      state: selectedState, district: '', city: '', pinCode: ''
    };
    setFormData({ ...formData, branchAddresses: updatedAddresses });
    setAddressArrays(prev => ({ ...prev, [index]: { ...prev[index], districts: [], cities: [] } }));

    if (selectedState && currentCountry) {
      setIsLoading(prev => ({ ...prev, districts: true }));
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ country: currentCountry, state: selectedState }),
        });
        const result = await response.json();
        if (result.data) {
          setAddressArrays(prev => ({
            ...prev,
            [index]: { ...prev[index], districts: result.data }
          }));
        }
      } catch (error) { console.error(error); }
      setIsLoading(prev => ({ ...prev, districts: false }));
    }
  };

  const handleDistrictChange = async (index, event) => {
    const selectedDistrict = event.target.value;
    const currentCountry = formData.branchAddresses[index].country;
    const updatedAddresses = [...formData.branchAddresses];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      district: selectedDistrict, city: '', pinCode: ''
    };
    setFormData({ ...formData, branchAddresses: updatedAddresses });
    setAddressArrays(prev => ({ ...prev, [index]: { ...prev[index], cities: [] } }));

    if (selectedDistrict && currentCountry === 'India') {
      setIsLoading(prev => ({ ...prev, cities: true }));
      try {
        const response = await fetch(`https://api.postalpincode.in/postoffice/${selectedDistrict}`);
        const result = await response.json();
        if (result?.[0]?.PostOffice) {
          const uniqueCities = [...new Set(result[0].PostOffice.map(po => ({ name: po.Name, pin: po.Pincode })))];
          const sortedCities = uniqueCities.sort((a, b) => a.name.localeCompare(b.name));
          setAddressArrays(prev => ({
            ...prev,
            [index]: { ...prev[index], cities: sortedCities }
          }));
        }
      } catch (error) { console.error(error); }
      setIsLoading(prev => ({ ...prev, cities: false }));
    }
  };

  const handleCityChange = (index, event) => {
    const selectedCityName = event.target.value;
    const selectedCityObj = addressArrays[index]?.cities.find((c) => c.name === selectedCityName);
    const updatedAddresses = [...formData.branchAddresses];

    updatedAddresses[index] = {
      ...updatedAddresses[index],
      city: selectedCityName,
      pinCode: selectedCityObj?.pin || '',
    };
    setFormData({ ...formData, branchAddresses: updatedAddresses });
  };

  // --- General Input Handler ---
  const handleInputChange = (field) => (event) => {
    const value = event.target.value;

    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      const teamSize = Number(updated.currentTeamSize || 0);
      const male = Number(updated.maleCount || 0);
      const female = Number(updated.femaleCount || 0);

      if (teamSize > 0) {
        if (male + female !== teamSize) {
          setErrors((prevErr) => ({
            ...prevErr,
            maleCount: "Male + Female must equal Team Size",
            femaleCount: "Male + Female must equal Team Size",
          }));
        } else {
          setErrors((prevErr) => ({
            ...prevErr,
            maleCount: "",
            femaleCount: "",
          }));
        }
      }
      return updated;
    });

    if (errors[field]) {
      setErrors((prevErr) => ({ ...prevErr, [field]: "" }));
    }
  };

  const handlePhoneCountryChange = (e) => {
    const selected = PHONE_COUNTRIES.find((c) => c.name === e.target.value);
    setFormData((prev) => ({
      ...prev,
      phoneCountry: selected.name,
      phoneCode: selected.code,
      phone: '',
    }));
  };

  // --- Validation ---
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    const checkRequired = (field, label) => {
      if (!formData[field]) {
        tempErrors[field] = `${label} is required`;
        isValid = false;
      }
    };

    checkRequired('firstName', 'First Name');
    checkRequired('lastName', 'Last Name');
    checkRequired('email', 'Email');
    checkRequired('phone', 'Phone Number');
    checkRequired('dateOfBirth', 'Date of Birth');
    checkRequired('gender', 'Gender');
    checkRequired('designation', 'Designation');

    if (formData.email && !emailRegex.test(formData.email)) {
      tempErrors.email = 'Enter a valid email address';
      isValid = false;
    }

    if (formData.phone) {
      const selectedCountry = PHONE_COUNTRIES.find((c) => c.name === formData.phoneCountry);
      const maxLength = selectedCountry?.maxLength || 15;
      if (formData.phone.length !== maxLength) {
        tempErrors.phone = `Phone number must be exactly ${maxLength} digits`;
        isValid = false;
      }
    }

    if (formData.founderPhone) {
      const selectedCountry = PHONE_COUNTRIES.find((c) => c.name === formData.founderPhoneCountry);
      const maxLength = selectedCountry?.maxLength || 15;
      if (formData.founderPhone.length !== maxLength) {
        tempErrors.founderPhone = `Founder phone number must be exactly ${maxLength} digits`;
        isValid = false;
      }
    }

    checkRequired('startupName', 'Startup Name');
    checkRequired('legalStatus', 'Legal Status');
    checkRequired('dateOfEstablishment', 'Date of Establishment');
    checkRequired('primarySector', 'Primary Sector');
    checkRequired('companyPAN', 'Company PAN');
    checkRequired('gstin', 'GSTIN / CIN');
    checkRequired('currentTeamSize', 'Team Size');
    checkRequired('maleCount', 'Male Employees');
    checkRequired('femaleCount', 'Female Employees');
    checkRequired('numberOfBranches', 'Number of Branches');

    checkRequired('founderEmail', 'Founder Email');
    checkRequired('founderFirstName', 'Founder First Name');
    checkRequired('founderLastName', 'Founder Last Name');
    checkRequired('founderPhone', 'Founder Phone');
    checkRequired('founderDOB', 'Founder Date of Birth');
    checkRequired('founderGender', 'Founder Gender');

    if (formData.founderEmail && !emailRegex.test(formData.founderEmail)) {
      tempErrors.founderEmail = 'Enter a valid founder email';
      isValid = false;
    }

    if (formData.dateOfEstablishment) {
      if (formData.dateOfEstablishment < twoYearsAgo) {
        tempErrors.dateOfEstablishment = 'Startup must be less than 2 years old';
        isValid = false;
      } else if (formData.dateOfEstablishment > today) {
        tempErrors.dateOfEstablishment = 'Date cannot be in the future';
        isValid = false;
      }
    }

    formData.branchAddresses.forEach((addr, index) => {
      if (!addr.country) { tempErrors[`address_${index}_country`] = 'Required'; isValid = false; }
      if (!addr.state) { tempErrors[`address_${index}_state`] = 'Required'; isValid = false; }
      if (!addr.district) { tempErrors[`address_${index}_district`] = 'Required'; isValid = false; }
      if (!addr.city) { tempErrors[`address_${index}_city`] = 'Required'; isValid = false; }
      if (!addr.pinCode) { tempErrors[`address_${index}_pinCode`] = 'Required'; isValid = false; }
      if (!addr.area) { tempErrors[`address_${index}_area`] = 'Area / Locality is required'; isValid = false; }
      if (!addr.fullAddress) { tempErrors[`address_${index}_fullAddress`] = 'Full Address is required'; isValid = false; }
    });

    // ---------- OPPORTUNITIES FOR STUDENTS ----------
    checkRequired('placementOffered', 'Placement Offered');
    if (formData.placementOffered === 'Yes') {
      checkRequired('placementType', 'Placement Type');
    }
    checkRequired('internshipOffered', 'Internship Offered');
    if (formData.internshipOffered === 'Yes') {
      checkRequired('internshipType', 'Internship Type');
    }
    checkRequired('trainingOffered', 'Training Offered');
    if (formData.trainingOffered === 'Yes' && formData.trainingType.length === 0) {
      tempErrors.trainingType = 'Select at least one Training Program';
      isValid = false;
    }
    checkRequired('fypOffered', 'Final Year Project');

    // ---------- STARTUP REQUIREMENTS ----------
    checkRequired('fundingNeeded', 'Funding Needed');
    checkRequired('mentorshipNeeded', 'Mentorship Needed');
    checkRequired('technologySupport', 'Technology Support Needed');
    checkRequired('incubationSpace', 'Incubation Space Needed');
    checkRequired('registrationNeeded', 'Registration Needed');


    setErrors(tempErrors);
    return isValid;
  };

  // --- SUBMIT ---
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // ✅ FIX 4: Correct Payload Construction (Merging Code + Phone)
        const payload = {
          ...formData,
          // Combine Country Code and Phone
          phone: `${formData.phoneCode}${formData.phone}`,
          founderPhone: `${formData.founderPhoneCode}${formData.founderPhone}`,
          // Ensure integers
          currentTeamSize: parseInt(formData.currentTeamSize) || 0,
          maleCount: parseInt(formData.maleCount) || 0,
          femaleCount: parseInt(formData.femaleCount) || 0,
          numberOfBranches: parseInt(formData.numberOfBranches) || 1
        };

        console.log("Sending data:", payload);

        const response = await fetch("http://localhost:8000/startup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Success:', data);
          alert('Application Submitted Successfully!');
          handleReset();
        } else {
          console.error('Submission Failed:', data);
          alert('Submission Failed: ' + (data.detail || 'Unknown error'));
        }
      } catch (error) {
        console.error('Network Error:', error);
        alert('Network Error: Could not connect to the backend.');
      }
    } else {
      alert('Please correct errors before submitting.');
    }
  };

  // ✅ FIX 2: Updated Handle Reset (Complete Reset)
  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneCountry: 'India',
      phoneCode: '+91',
      phone: '',
      linkedin: '',
      website: '',
      dateOfBirth: '',
      gender: '',
      designation: '',

      startupName: '',
      legalStatus: '',
      dateOfEstablishment: '',
      primarySector: '',
      secondarySector: '',
      companyPAN: '',
      gstin: '',
      companyWebsite: '',
      currentTeamSize: '',
      maleCount: '',
      femaleCount: '',
      numberOfBranches: '1',

      branchAddresses: [{ ...initialAddress }],

      founderFirstName: '',
      founderLastName: '',
      founderEmail: '',
      founderPhoneCountry: 'India',
      founderPhoneCode: '+91',
      founderPhone: '',
      founderDOB: '',
      founderGender: '',
      founderLinkedIn: '',
      founderFacebook: '',

      placementOffered: '',
      placementType: '',
      internshipOffered: '',
      internshipType: '',
      trainingOffered: '',
      trainingType: [],
      fypOffered: '',

      fundingNeeded: '',
      mentorshipNeeded: '',
      technologySupport: '',
      incubationSpace: '',
      registrationNeeded: '',
      supportInterest: '',
      governmentSchemes: '',
    });

    setErrors({});
    setAddressArrays({ 0: { states: [], districts: [], cities: [] } });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" align="center" sx={{ mb: 4, color: '#1f4d3a', fontWeight: 'bold', fontSize: '34px' }}>
          Startup Details Form (Under 2 Years)
        </Typography>

        {/* Company Details */}
        <Card sx={{ mb: 3, border: "2px solid #1f4d3a" }}>
          <Box sx={{ backgroundColor: "#1f4d3a", color: "white", p: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "20px" }}>Company Details</Typography>
          </Box>

          <CardContent sx={{ p: 3 }}>
            {/* ROW 1 */}
            <FormRow>
              <TextField
                label="Startup Name *"
                value={formData.startupName}
                onChange={handleInputChange("startupName")}
                error={!!errors.startupName}
                helperText={errors.startupName}
              />

              <TextField
                select
                label="Legal Status *"
                value={formData.legalStatus}
                onChange={handleInputChange("legalStatus")}
                error={!!errors.legalStatus}
                helperText={errors.legalStatus}
              >
                <MenuItem value="Private Limited">Private Limited</MenuItem>
                <MenuItem value="LLP">LLP</MenuItem>
                <MenuItem value="Partnership">Partnership</MenuItem>
                <MenuItem value="Sole Proprietorship">Sole Proprietorship</MenuItem>
              </TextField>

              <TextField
                label="Date of Establishment *"
                type="date"
                value={formData.dateOfEstablishment}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  if (selectedDate > today) {
                    setErrors((prev) => ({ ...prev, dateOfEstablishment: "Date cannot be in the future" }));
                    return;
                  }
                  if (selectedDate < twoYearsAgo) {
                    setErrors((prev) => ({ ...prev, dateOfEstablishment: "Only startups established within the last 2 years are eligible" }));
                    return;
                  }
                  setErrors((prev) => ({ ...prev, dateOfEstablishment: "" }));
                  setFormData((prev) => ({ ...prev, dateOfEstablishment: selectedDate }));
                }}
                error={!!errors.dateOfEstablishment}
                helperText={errors.dateOfEstablishment || `Must be established within 2 years `}
                inputProps={{ min: twoYearsAgo, max: today, onKeyDown: (e) => e.preventDefault() }}
              />

              <TextField
                label="Company Website"
                value={formData.companyWebsite}
                onChange={handleInputChange("companyWebsite")}
                placeholder="https://www.yourstartup.com"
              />
            </FormRow>

            {/* ROW 2 */}
            <FormRow>
              <TextField
                select
                label="Primary Sector *"
                value={formData.primarySector}
                onChange={handleInputChange("primarySector")}
                error={!!errors.primarySector}
                helperText={errors.primarySector || "Select your startup's main sector"}
              >
                <MenuItem value="HealthTech">HealthTech</MenuItem>
                <MenuItem value="FinTech">FinTech</MenuItem>
                <MenuItem value="EdTech">EdTech</MenuItem>
                <MenuItem value="AgriTech">AgriTech</MenuItem>
                <MenuItem value="E-Commerce">E-Commerce</MenuItem>
                <MenuItem value="AI / ML">AI / ML</MenuItem>
                <MenuItem value="IoT">IoT</MenuItem>
                <MenuItem value="SaaS">SaaS</MenuItem>
                <MenuItem value="Blockchain">Blockchain</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>

              <TextField
                select
                label="Secondary Sector"
                value={formData.secondarySector}
                onChange={handleInputChange("secondarySector")}
                helperText="Optional – select additional focus area"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="HealthTech">HealthTech</MenuItem>
                <MenuItem value="FinTech">FinTech</MenuItem>
                <MenuItem value="EdTech">EdTech</MenuItem>
                <MenuItem value="AgriTech">AgriTech</MenuItem>
                <MenuItem value="E-Commerce">E-Commerce</MenuItem>
                <MenuItem value="AI / ML">AI / ML</MenuItem>
                <MenuItem value="IoT">IoT</MenuItem>
                <MenuItem value="SaaS">SaaS</MenuItem>
                <MenuItem value="Blockchain">Blockchain</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>

              <TextField
                label="Company PAN *"
                value={formData.companyPAN}
                onChange={(e) => handleInputChange("companyPAN")({ target: { value: e.target.value.toUpperCase() } })}
                placeholder="ABCDE1234F"
                inputProps={{ maxLength: 10 }}
                error={!!errors.companyPAN}
                helperText={errors.companyPAN}
              />

              <TextField
                label="GSTIN / CIN *"
                value={formData.gstin}
                onChange={(e) =>
                  handleInputChange("gstin")({
                    target: { value: e.target.value.toUpperCase() }
                  })
                }
                inputProps={{ maxLength: 21 }}
                placeholder="GSTIN/CIN"
                error={!!errors.gstin}
                helperText={errors.gstin}
              />
            </FormRow>

            {/* ROW 3 */}
            <FormRow>
              <TextField
                label="Current Team Size *"
                type="number"
                value={formData.currentTeamSize}
                onChange={handleInputChange("currentTeamSize")}
                placeholder="Excluding Founders"
                error={!!errors.currentTeamSize}
                helperText={errors.currentTeamSize}
                inputProps={{ min: 0 }}
              />

              <TextField
                label="Male Employees *"
                type="number"
                value={formData.maleCount}
                onChange={handleInputChange("maleCount")}
                error={!!errors.maleCount}
                helperText={errors.maleCount}
                inputProps={{ min: 0 }}
              />

              <TextField
                label="Female Employees *"
                type="number"
                value={formData.femaleCount}
                onChange={handleInputChange("femaleCount")}
                error={!!errors.femaleCount}
                helperText={errors.femaleCount}
                inputProps={{ min: 0 }}
              />

              <TextField
                label="Number of Branches *"
                type="number"
                value={formData.numberOfBranches}
                onChange={handleBranchCountChange}
                error={!!errors.numberOfBranches}
                helperText={errors.numberOfBranches || "Enter a value between 1 and 20"}
                inputProps={{ min: 1, max: 20 }}
              />
            </FormRow>
          </CardContent>
        </Card>

        {/* Dynamic Registered Office Address(es) based on Number of Branches */}
        {formData.branchAddresses.map((address, index) => {
          const currentLists = addressArrays[index] || { states: [], districts: [], cities: [] };
          return (
            <Card key={index} sx={{ mb: 3, border: '2px solid #1f4d3a' }}>
              <Box sx={{ backgroundColor: '#1f4d3a', color: 'white', p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                  {index === 0 ? "Registered Office Address 1 (Main)" : `Registered Office Address ${index + 1}`}
                </Typography>
              </Box>
              <CardContent sx={{ p: 3 }}>
                <FormRow>
                  <TextField
                    select
                    label="Country *"
                    value={address.country}
                    onChange={(e) => handleCountryChange(index, e)}
                    disabled={isLoading.countries}
                    error={!!errors[`address_${index}_country`]}
                    helperText={errors[`address_${index}_country`]}
                  >
                    {isLoading.countries ? <MenuItem disabled><CircularProgress size={20} /> Loading...</MenuItem> : countryList.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </TextField>

                  <TextField
                    select
                    label="State *"
                    value={address.state}
                    onChange={(e) => handleStateChange(index, e)}
                    disabled={!address.country || isLoading.states}
                    error={!!errors[`address_${index}_state`]}
                    helperText={errors[`address_${index}_state`]}
                  >
                    {currentLists.states.length === 0 && address.country ? <MenuItem disabled>Loading/No Data</MenuItem> :
                      currentLists.states.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                  </TextField>

                  <TextField
                    select
                    label="District *"
                    value={address.district}
                    onChange={(e) => handleDistrictChange(index, e)}
                    disabled={!address.state || isLoading.districts}
                    error={!!errors[`address_${index}_district`]}
                    helperText={errors[`address_${index}_district`]}
                  >
                    {currentLists.districts.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                  </TextField>

                  {address.country === 'India' ? (
                    <TextField
                      select
                      label="City *"
                      value={address.city}
                      onChange={(e) => handleCityChange(index, e)}
                      disabled={!address.district || isLoading.cities}
                      error={!!errors[`address_${index}_city`]}
                      helperText={errors[`address_${index}_city`]}
                    >
                      {currentLists.cities.map((c, i) => <MenuItem key={`${c.name}-${i}`} value={c.name}>{c.name}</MenuItem>)}
                    </TextField>
                  ) : (
                    <TextField
                      label="City *"
                      value={address.city}
                      onChange={(e) => handleAddressFieldChange(index, 'city', e.target.value)}
                      placeholder="Enter City"
                      error={!!errors[`address_${index}_city`]}
                      helperText={errors[`address_${index}_city`]}
                    />
                  )}
                </FormRow>

                <FormRow>
                  <TextField
                    label="Area / Locality *"
                    value={address.area}
                    onChange={(e) => handleAddressFieldChange(index, 'area', e.target.value)}
                    error={!!errors[`address_${index}_area`]}
                    helperText={errors[`address_${index}_area`]}
                  />
                  <TextField
                    label="Pin Code *"
                    value={address.pinCode}
                    onChange={(e) => handleAddressFieldChange(index, 'pinCode', e.target.value)}
                    error={!!errors[`address_${index}_pinCode`]}
                    helperText={errors[`address_${index}_pinCode`]}
                  />
                </FormRow>

                <FormRow>
                  <TextField
                    label="Full Address (Street / Building / Door No) *"
                    multiline
                    rows={2}
                    value={address.fullAddress}
                    onChange={(e) => handleAddressFieldChange(index, 'fullAddress', e.target.value)}
                    placeholder="Enter detailed address here"
                    error={!!errors[`address_${index}_fullAddress`]}
                    helperText={errors[`address_${index}_fullAddress`]}
                  />
                </FormRow>
              </CardContent>
            </Card>
          )
        })}

        {/* Personal Information */}
        <Card sx={{ mb: 3, border: '2px solid #1f4d3a' }}>
          <Box sx={{ backgroundColor: '#1f4d3a', color: 'white', p: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '20px' }}>Personal Information</Typography>
          </Box>
          <CardContent sx={{ p: 3 }}>
            <FormRow>
              <TextField
                label="First Name *"
                value={formData.firstName}
                onChange={handleInputChange('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                label="Last Name *"
                value={formData.lastName}
                onChange={handleInputChange('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
              <TextField
                label="Email Address *"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  const value = e.target.value;
                  handleInputChange('email')(e);
                  if (value && !emailRegex.test(value)) {
                    setErrors((prev) => ({ ...prev, email: "Enter a valid email address (example: name@gmail.com)" }));
                  } else {
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }
                }}
                error={!!errors.email}
                helperText={errors.email}
              />
            </FormRow>
            <FormRow>
              <TextField
                label="Phone Number *"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setFormData((prev) => ({ ...prev, phone: value }));
                }}
                inputProps={{ maxLength: PHONE_COUNTRIES.find((c) => c.name === formData.phoneCountry)?.maxLength || 15 }}
                error={!!errors.phone}
                helperText={errors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Select
                        value={formData.phoneCountry}
                        onChange={handlePhoneCountryChange}
                        variant="standard"
                        disableUnderline
                      >
                        {PHONE_COUNTRIES.map((c) => (
                          <MenuItem key={c.name} value={c.name}>{c.code}</MenuItem>
                        ))}
                      </Select>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField label="LinkedIn Profile URL" value={formData.linkedin} onChange={handleInputChange('linkedin')} />
              <TextField
                label="Date of Birth *"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange('dateOfBirth')}
                InputLabelProps={{ shrink: true }}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
                inputProps={{ max: today }}
              />
            </FormRow>
            <FormRow>
              <TextField
                label="Designation *"
                value={formData.designation}
                onChange={handleInputChange('designation')}
                error={!!errors.designation}
                helperText={errors.designation}
                sx={{ flex: 1 }}
              />
              <FormControl component="fieldset" error={!!errors.gender}>
                <FormLabel component="legend" sx={{ fontSize: '14px' }}>Gender *</FormLabel>
                <RadioGroup row value={formData.gender} onChange={handleInputChange('gender')}>
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  <FormControlLabel value="Others" control={<Radio />} label="Others" />
                </RadioGroup>
                {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
              </FormControl>
            </FormRow>
          </CardContent>
        </Card>

        {/* Founder Details */}
        <Card sx={{ mb: 3, border: '2px solid #1f4d3a' }}>
          <Box sx={{ backgroundColor: '#1f4d3a', color: 'white', p: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '20px' }}>Founder Details</Typography>
          </Box>
          <CardContent sx={{ p: 3 }}>
            <FormRow>
              <TextField
                label="Founder First Name *"
                value={formData.founderFirstName}
                onChange={handleInputChange('founderFirstName')}
                error={!!errors.founderFirstName}
                helperText={errors.founderFirstName}
              />
              <TextField
                label="Founder Last Name *"
                value={formData.founderLastName}
                onChange={handleInputChange('founderLastName')}
                error={!!errors.founderLastName}
                helperText={errors.founderLastName}
              />
              <TextField
                label="Founder Email *"
                type="email"
                value={formData.founderEmail}
                onChange={(e) => {
                  const value = e.target.value;
                  handleInputChange('founderEmail')(e);
                  if (value && !emailRegex.test(value)) {
                    setErrors((prev) => ({ ...prev, founderEmail: "Enter a valid email (example: founder@gmail.com)" }));
                  } else {
                    setErrors((prev) => ({ ...prev, founderEmail: "" }));
                  }
                }}
                error={!!errors.founderEmail}
                helperText={errors.founderEmail}
              />
            </FormRow>

            <FormRow>
              <TextField
                label="Founder Phone Number *"
                value={formData.founderPhone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setFormData((prev) => ({ ...prev, founderPhone: value }));
                }}
                inputProps={{ maxLength: PHONE_COUNTRIES.find((c) => c.name === formData.founderPhoneCountry)?.maxLength || 15 }}
                error={!!errors.founderPhone}
                helperText={errors.founderPhone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Select
                        value={formData.founderPhoneCountry}
                        onChange={(e) => {
                          const selected = PHONE_COUNTRIES.find((c) => c.name === e.target.value);
                          setFormData((prev) => ({
                            ...prev,
                            founderPhoneCountry: selected.name,
                            founderPhoneCode: selected.code,
                            founderPhone: '',
                          }));
                        }}
                        variant="standard"
                        disableUnderline
                      >
                        {PHONE_COUNTRIES.map((c) => (
                          <MenuItem key={c.name} value={c.name}>{c.code}</MenuItem>
                        ))}
                      </Select>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Founder LinkedIn Profile"
                value={formData.founderLinkedIn}
                onChange={handleInputChange('founderLinkedIn')}
                placeholder="https://linkedin.com/in/username"
              />
              <TextField
                label="Founder Facebook Profile"
                value={formData.founderFacebook}
                onChange={handleInputChange('founderFacebook')}
                placeholder="https://facebook.com/username"
              />
            </FormRow>

            <FormRow>
              <TextField
                label="Founder Date of Birth *"
                type="date"
                value={formData.founderDOB}
                onChange={handleInputChange('founderDOB')}
                InputLabelProps={{ shrink: true }}
                error={!!errors.founderDOB}
                helperText={errors.founderDOB}
                inputProps={{ max: today }}
              />
              <FormControl component="fieldset" error={!!errors.founderGender} sx={{ minWidth: 250 }}>
                <FormLabel component="legend" sx={{ fontSize: '14px' }}>Founder Gender *</FormLabel>
                <RadioGroup row value={formData.founderGender} onChange={handleInputChange('founderGender')}>
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  <FormControlLabel value="Others" control={<Radio />} label="Others" />
                </RadioGroup>
                {errors.founderGender && <FormHelperText>{errors.founderGender}</FormHelperText>}
              </FormControl>
            </FormRow>
          </CardContent>
        </Card>

        {/* Opportunities for Students */}
        <Card sx={{ mb: 3, border: '2px solid #1f4d3a' }}>
          <Box sx={{ backgroundColor: '#1f4d3a', color: 'white', p: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '20px' }}>Opportunities for Students</Typography>
          </Box>
          <CardContent sx={{ px: 4, py: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, columnGap: 6, rowGap: 4 }}>

              {/* PLACEMENTS */}
              <FormControl error={!!errors.placementOffered}>
                <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Do you offer Placements?</FormLabel>
                <RadioGroup row value={formData.placementOffered} onChange={handleInputChange('placementOffered')}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                {errors.placementOffered && (
                  <FormHelperText>{errors.placementOffered}</FormHelperText>
                )}
              </FormControl>
              {formData.placementOffered === 'Yes' && (
                <FormControl error={!!errors.placementType}>
                  <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Placement Type</FormLabel>
                  <RadioGroup row value={formData.placementType} onChange={handleInputChange('placementType')}>
                    <FormControlLabel value="On-Campus" control={<Radio />} label="On-Campus" />
                    <FormControlLabel value="Off-Campus" control={<Radio />} label="Off-Campus" />
                    <FormControlLabel value="Both" control={<Radio />} label="Both" />
                  </RadioGroup>
                  {errors.placementType && (
                    <FormHelperText>{errors.placementType}</FormHelperText>
                  )}
                </FormControl>
              )}

              {/* INTERNSHIPS */}
              <FormControl error={!!errors.internshipOffered}>
                <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Do you provide Internships?</FormLabel>
                <RadioGroup row value={formData.internshipOffered} onChange={handleInputChange('internshipOffered')}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                {errors.internshipOffered && (
                  <FormHelperText>{errors.internshipOffered}</FormHelperText>
                )}
              </FormControl>
              {formData.internshipOffered === 'Yes' && (
                <FormControl error={!!errors.internshipType}>
                  <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Internship Type</FormLabel>
                  <RadioGroup row value={formData.internshipType} onChange={handleInputChange('internshipType')}>
                    <FormControlLabel value="Paid" control={<Radio />} label="Paid" />
                    <FormControlLabel value="Unpaid" control={<Radio />} label="Unpaid" />
                    <FormControlLabel value="Performance-Based" control={<Radio />} label="Performance-Based" />
                  </RadioGroup>
                  {errors.internshipType && (
                    <FormHelperText>{errors.internshipType}</FormHelperText>
                  )}
                </FormControl>
              )}

              {/* TRAINING */}
              <FormControl error={!!errors.trainingOffered}>
                <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Do you offer Training / Apprenticeship?</FormLabel>
                <RadioGroup row value={formData.trainingOffered} onChange={handleInputChange('trainingOffered')}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                {errors.trainingOffered && (
                  <FormHelperText>{errors.trainingOffered}</FormHelperText>
                )}
              </FormControl>
              {formData.trainingOffered === 'Yes' && (
                <FormControl>
                  <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Program Type</FormLabel>
                  <Box sx={{ display: 'flex', gap: 4, flexWrap: 'nowrap', alignItems: 'center' }}>
                    {['Industrial Training', 'Apprenticeship', 'Skill Development'].map((option) => (
                      <FormControlLabel
                        key={option}
                        control={
                          <Checkbox
                            checked={formData.trainingType.includes(option)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setFormData((prev) => ({
                                ...prev,
                                trainingType: checked
                                  ? [...prev.trainingType, option]
                                  : prev.trainingType.filter((v) => v !== option),
                              }));
                            }}
                          />
                        }
                        label={option}
                      />
                    ))}
                  </Box>

                  {errors.trainingType && (
                    <FormHelperText error>{errors.trainingType}</FormHelperText>
                  )}
                </FormControl>
              )}

              {/* FYP */}
              <FormControl sx={{ gridColumn: { md: 'span 2' } }} error={!!errors.fypOffered}>
                <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Do you provide Final Year Projects?</FormLabel>
                <RadioGroup row value={formData.fypOffered} onChange={handleInputChange('fypOffered')}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                {errors.fypOffered && (
                  <FormHelperText>{errors.fypOffered}</FormHelperText>
                )}
              </FormControl>
            </Box>
          </CardContent>
        </Card>

        {/* Startup Requirements */}
        <Card sx={{ mb: 3, border: '2px solid #1f4d3a' }}>
          <Box sx={{ backgroundColor: '#1f4d3a', color: 'white', p: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '20px' }}>Startup Requirements</Typography>
          </Box>
          <CardContent sx={{ px: 4, py: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, columnGap: 6, rowGap: 4 }}>

              <FormControl error={!!errors.fundingNeeded}>
                <FormLabel sx={{ mb: 1, fontSize: '14px', textAlign: 'left' }}>Funding Needed ?</FormLabel>
                <RadioGroup row value={formData.fundingNeeded} onChange={handleInputChange('fundingNeeded')}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                {errors.fundingNeeded && (
                  <FormHelperText>{errors.fundingNeeded}</FormHelperText>
                )}
              </FormControl>

              <FormControl error={!!errors.mentorshipNeeded}>
                <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Mentorship Needed ?</FormLabel>
                <RadioGroup row value={formData.mentorshipNeeded} onChange={handleInputChange('mentorshipNeeded')}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                {errors.mentorshipNeeded && (
                  <FormHelperText>{errors.mentorshipNeeded}</FormHelperText>
                )}
              </FormControl>

              <FormControl error={!!errors.technologySupport}>
                <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Technology Support Needed ?</FormLabel>
                <RadioGroup row value={formData.technologySupport} onChange={handleInputChange('technologySupport')}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                {errors.technologySupport && (
                  <FormHelperText>{errors.technologySupport}</FormHelperText>
                )}
              </FormControl>

              <FormControl error={!!errors.incubationSpace}>
                <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Do you require Incubation / Co-working Space ?</FormLabel>
                <RadioGroup row value={formData.incubationSpace} onChange={handleInputChange('incubationSpace')}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                {errors.incubationSpace && (
                  <FormHelperText>{errors.incubationSpace}</FormHelperText>
                )}
              </FormControl>

              <FormControl sx={{ gridColumn: { md: 'span 2' } }} error={!!errors.registrationNeeded}>
                <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Registration Needed ?</FormLabel>
                <RadioGroup row value={formData.registrationNeeded} onChange={handleInputChange('registrationNeeded')}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                {errors.registrationNeeded && (
                  <FormHelperText>{errors.registrationNeeded}</FormHelperText>
                )}
              </FormControl>

              <TextField
                multiline rows={3}
                label="I am interested in receiving support for an internship program"
                value={formData.supportInterest || ''}
                onChange={handleInputChange('supportInterest')}
              />

              <TextField
                multiline rows={3}
                label="Check my eligibility for relevant Government Startup Schemes."
                value={formData.governmentSchemes || ''}
                onChange={handleInputChange('governmentSchemes')}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
          <Button variant="contained" size="large" onClick={handleSubmit} sx={{ backgroundColor: '#1f4d3a', '&:hover': { backgroundColor: '#0f7e16ff' }, px: 4, py: 1.5 }}>SUBMIT APPLICATION</Button>
          <Button variant="outlined" size="large" onClick={handleReset} sx={{ borderColor: '#f44336', color: '#f44336', '&:hover': { borderColor: '#d32f2f', backgroundColor: '#ffebee' }, px: 4, py: 1.5 }}>RESET FORM</Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;