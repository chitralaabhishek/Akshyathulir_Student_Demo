import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

// --- THEME CONFIGURATION ---
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

// --- HELPER COMPONENT FOR GRID LAYOUT ---
const FormRow = ({ children }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
    {React.Children.map(children, (child) => (
      <Box sx={{ flex: 1, minWidth: '250px' }}>
        {child}
      </Box>
    ))}
  </Box>
);

// --- PHONE COUNTRY CODES ---
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

  // --- INITIAL DATA STRUCTURES ---
  const initialAddress = {
    fullAddress: '',
    country: '',
    state: '',
    district: '',
    city: '',
    area: '',
    pinCode: '',
    isPrimary: false
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    linkedin: '',
    website: '',
    dateOfBirth: '',
    gender: '',
    designation: '',
    cin: '',
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
    branchAddresses: [{ ...initialAddress, isPrimary: true }],
    founderEmail: '',
    founderFirstName: '',
    founderLastName: '',
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
    trainingType: [],
    fypOffered: '',
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
    countries: false, states: false, districts: false, cities: false, cin: false
  });

  // --- API: FETCH COUNTRY LIST ON LOAD ---
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

  // --- API: FETCH COMPANY DETAILS VIA CIN ---
  const fetchCompanyDetails = async (cinValue) => {
    if (cinValue.length !== 21) return;
    setIsLoading(prev => ({ ...prev, cin: true }));
    try {
      const response = await axios.get(`http://localhost:8000/fetch-cin/${cinValue}`);
      if (response.data) {
        setFormData(prev => ({
          ...prev,
          startupName: response.data.company_name || '',
          legalStatus: response.data.company_type || '',
          dateOfEstablishment: response.data.registration_date || ''
        }));
      }
    } catch (error) {
      console.error("CIN API Error:", error);
      alert("Company details not found for this CIN. Please fill manually.");
    } finally {
      setIsLoading(prev => ({ ...prev, cin: false }));
    }
  };

  // --- LOGIC: SET PRIMARY/MAIN ADDRESS ---
  const handleSetMainAddress = (index) => {
    const updated = formData.branchAddresses.map((addr, i) => ({
      ...addr,
      isPrimary: i === index
    }));
    setFormData({ ...formData, branchAddresses: updated });
  };

  // --- LOGIC: HANDLE BRANCH COUNT CHANGE ---
  const handleBranchCountChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setFormData({ ...formData, numberOfBranches: "", branchAddresses: [] });
      setErrors((prev) => ({ ...prev, numberOfBranches: "Number of branches is required" }));
      return;
    }
    let count = Number(value);
    if (isNaN(count) || count < 1) return;
    if (count > 20) {
      setErrors((prev) => ({ ...prev, numberOfBranches: "Maximum allowed branches is 20" }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, numberOfBranches: "" }));
    }
    const updatedAddresses = [...formData.branchAddresses];
    if (count > updatedAddresses.length) {
      for (let i = updatedAddresses.length; i < count; i++) {
        updatedAddresses.push({ ...initialAddress, isPrimary: false });
      }
    } else if (count < updatedAddresses.length) {
      const removedPrimary = updatedAddresses.slice(count).some(a => a.isPrimary);
      updatedAddresses.length = count;
      if (removedPrimary && updatedAddresses.length > 0) updatedAddresses[0].isPrimary = true;
    }
    setFormData({ ...formData, numberOfBranches: value, branchAddresses: updatedAddresses });
  };

  // --- LOGIC: UPDATE INDIVIDUAL ADDRESS FIELDS ---
  const handleAddressFieldChange = (index, field, value) => {
    const updatedAddresses = [...formData.branchAddresses];
    updatedAddresses[index] = { ...updatedAddresses[index], [field]: value };
    setFormData({ ...formData, branchAddresses: updatedAddresses });
  };

  // --- API: HANDLE COUNTRY SELECTION ---
  const handleCountryChange = async (index, event) => {
    const selectedCountry = event.target.value;
    const updatedAddresses = [...formData.branchAddresses];
    updatedAddresses[index] = { ...updatedAddresses[index], country: selectedCountry, state: '', district: '', city: '', pinCode: '' };
    setFormData({ ...formData, branchAddresses: updatedAddresses });
    setAddressArrays(prev => ({ ...prev, [index]: { states: [], districts: [], cities: [] } }));
    if (selectedCountry) {
      setIsLoading(prev => ({ ...prev, states: true }));
      try {
        const response = await axios.post("https://countriesnow.space/api/v0.1/countries/states", { country: selectedCountry });
        if (response.data.data?.states) {
          setAddressArrays(prev => ({ ...prev, [index]: { ...prev[index], states: response.data.data.states.map(s => s.name) } }));
        }
      } catch (error) { console.error(error); }
      setIsLoading(prev => ({ ...prev, states: false }));
    }
  };

  // --- API: HANDLE STATE SELECTION ---
  const handleStateChange = async (index, event) => {
    const selectedState = event.target.value;
    const currentCountry = formData.branchAddresses[index].country;
    const updatedAddresses = [...formData.branchAddresses];
    updatedAddresses[index] = { ...updatedAddresses[index], state: selectedState, district: '', city: '', pinCode: '' };
    setFormData({ ...formData, branchAddresses: updatedAddresses });
    if (selectedState && currentCountry) {
      setIsLoading(prev => ({ ...prev, districts: true }));
      try {
        const response = await axios.post("https://countriesnow.space/api/v0.1/countries/state/cities", { country: currentCountry, state: selectedState });
        if (response.data.data) setAddressArrays(prev => ({ ...prev, [index]: { ...prev[index], districts: response.data.data } }));
      } catch (error) { console.error(error); }
      setIsLoading(prev => ({ ...prev, districts: false }));
    }
  };

  // --- API: HANDLE DISTRICT SELECTION ---
  const handleDistrictChange = async (index, event) => {
    const selectedDistrict = event.target.value;
    const currentCountry = formData.branchAddresses[index].country;
    const updatedAddresses = [...formData.branchAddresses];
    updatedAddresses[index] = { ...updatedAddresses[index], district: selectedDistrict, city: '', pinCode: '' };
    setFormData({ ...formData, branchAddresses: updatedAddresses });
    if (selectedDistrict && currentCountry === 'India') {
      setIsLoading(prev => ({ ...prev, cities: true }));
      try {
        const response = await axios.get(`https://api.postalpincode.in/postoffice/${selectedDistrict}`);
        if (response.data?.[0]?.PostOffice) {
          const uniqueCities = [...new Set(response.data[0].PostOffice.map(po => ({ name: po.Name, pin: po.Pincode })))];
          setAddressArrays(prev => ({ ...prev, [index]: { ...prev[index], cities: uniqueCities.sort((a, b) => a.name.localeCompare(b.name)) } }));
        }
      } catch (error) { console.error(error); }
      setIsLoading(prev => ({ ...prev, cities: false }));
    }
  };

  // --- LOGIC: HANDLE CITY CHANGE ---
  const handleCityChange = (index, event) => {
    const selectedCityName = event.target.value;
    const selectedCityObj = addressArrays[index]?.cities.find((c) => c.name === selectedCityName);
    const updatedAddresses = [...formData.branchAddresses];
    updatedAddresses[index] = { ...updatedAddresses[index], city: selectedCityName, pinCode: selectedCityObj?.pin || '' };
    setFormData({ ...formData, branchAddresses: updatedAddresses });
  };

  // --- LOGIC: INPUT CHANGE HANDLER ---
  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    if (['currentTeamSize', 'maleCount', 'femaleCount', 'numberOfBranches'].includes(field)) {
      if (value !== "" && Number(value) < 0) return;
    }
    if (field === 'cin' && value.length === 21) {
      fetchCompanyDetails(value.toUpperCase());
    }
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      const teamSize = Number(updated.currentTeamSize || 0);
      const male = Number(updated.maleCount || 0);
      const female = Number(updated.femaleCount || 0);
      if (teamSize > 0 && male + female !== teamSize) {
        setErrors((prevErr) => ({ ...prevErr, maleCount: "Male + Female must equal Team Size", femaleCount: "Male + Female must equal Team Size" }));
      } else {
        setErrors((prevErr) => ({ ...prevErr, maleCount: "", femaleCount: "" }));
      }
      return updated;
    });
    if (errors[field]) setErrors((prevErr) => ({ ...prevErr, [field]: "" }));
  };

  const handlePhoneCountryChange = (e) => {
    const selected = PHONE_COUNTRIES.find((c) => c.name === e.target.value);
    setFormData((prev) => ({ ...prev, phoneCountry: selected.name, phoneCode: selected.code, phone: '' }));
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;
    const checkRequired = (field, label) => { if (!formData[field]) { tempErrors[field] = `${label} is required`; isValid = false; } };

    checkRequired('firstName', 'First Name');
    checkRequired('lastName', 'Last Name');
    checkRequired('email', 'Email');
    checkRequired('phone', 'Phone Number');
    checkRequired('dateOfBirth', 'Date of Birth');
    checkRequired('gender', 'Gender');
    checkRequired('designation', 'Designation');
    if (formData.email && !emailRegex.test(formData.email)) { tempErrors.email = 'Enter a valid email address'; isValid = false; }
    checkRequired('startupName', 'Startup Name');
    checkRequired('legalStatus', 'Legal Status');
    checkRequired('dateOfEstablishment', 'Date of Establishment');
    checkRequired('primarySector', 'Primary Sector');
    checkRequired('companyPAN', 'Company PAN');
    checkRequired('gstin', 'GSTIN');
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

    formData.branchAddresses.forEach((addr, index) => {
      if (!addr.country) { tempErrors[`address_${index}_country`] = 'Required'; isValid = false; }
      if (!addr.state) { tempErrors[`address_${index}_state`] = 'Required'; isValid = false; }
      if (!addr.district) { tempErrors[`address_${index}_district`] = 'Required'; isValid = false; }
      if (!addr.city) { tempErrors[`address_${index}_city`] = 'Required'; isValid = false; }
      if (!addr.pinCode) { tempErrors[`address_${index}_pinCode`] = 'Required'; isValid = false; }
      if (!addr.area) { tempErrors[`address_${index}_area`] = 'Area / Locality is required'; isValid = false; }
      if (!addr.fullAddress) { tempErrors[`address_${index}_fullAddress`] = 'Full Address is required'; isValid = false; }
    });

    checkRequired('placementOffered', 'Placement Offered');
    checkRequired('internshipOffered', 'Internship Offered');
    checkRequired('trainingOffered', 'Training Offered');
    checkRequired('fypOffered', 'Final Year Project');
    checkRequired('fundingNeeded', 'Funding Needed');
    checkRequired('mentorshipNeeded', 'Mentorship Needed');
    checkRequired('technologySupport', 'Technology Support Needed');
    checkRequired('incubationSpace', 'Incubation Space Needed');
    checkRequired('registrationNeeded', 'Registration Needed');

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const payload = {
          ...formData,
          phone: `${formData.phoneCode}${formData.phone}`,
          founderPhone: `${formData.founderPhoneCode}${formData.founderPhone}`,
          currentTeamSize: parseInt(formData.currentTeamSize) || 0,
          numberOfBranches: parseInt(formData.numberOfBranches) || 1
        };
        const response = await axios.post("http://localhost:8000/startup", payload);
        if (response.status === 200 || response.status === 201) {
          alert('Application Submitted Successfully!');
          handleReset();
        }
      } catch (error) { alert('Network Error: Could not connect to the backend.'); }
    } else { alert('Please correct errors before submitting.'); }
  };

  const handleReset = () => { window.location.reload(); };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" align="center" sx={{ mb: 4, color: '#1f4d3a', fontWeight: 'bold', fontSize: '34px' }}>
          Startup Details Form (Under 2 Years)
        </Typography>

        {/* --- SECTION: COMPANY DETAILS --- */}
        <Card sx={{ mb: 3, border: "2px solid #1f4d3a" }}>
          <Box sx={{ backgroundColor: "#1f4d3a", color: "white", p: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "20px" }}>Company Details</Typography>
          </Box>
          <CardContent sx={{ p: 3 }}>
            <FormRow>
              <TextField 
                label="CIN (Corporate Identification Number)" 
                value={formData.cin} 
                onChange={(e) => handleInputChange("cin")({ target: { value: e.target.value.toUpperCase() } })} 
                inputProps={{ maxLength: 21 }}
                placeholder="Ex: U74140DL2015PTC284344"
                InputProps={{
                  endAdornment: isLoading.cin ? <CircularProgress size={20} color="inherit" /> : null
                }}
              />
              <TextField 
                label="Startup Name *" 
                value={formData.startupName} 
                onChange={handleInputChange("startupName")} 
                error={!!errors.startupName} 
                helperText={errors.startupName} 
                placeholder="Enter Company Registered Name"
              />
              <TextField 
                label="GSTIN *" 
                value={formData.gstin} 
                onChange={(e) => handleInputChange("gstin")({ target: { value: e.target.value.toUpperCase() } })} 
                inputProps={{ maxLength: 15 }} 
                error={!!errors.gstin} 
                helperText={errors.gstin || "Enter 15-digit GSTIN"} 
                placeholder="Ex: 07AAAAA0000A1Z5"
              />
              <TextField 
                label="Company PAN *" 
                value={formData.companyPAN} 
                onChange={(e) => handleInputChange("companyPAN")({ target: { value: e.target.value.toUpperCase() } })} 
                placeholder="Ex: ABCDE1234F" 
                inputProps={{ maxLength: 10 }} 
                error={!!errors.companyPAN} 
                helperText={errors.companyPAN} 
              />
            </FormRow>

            <FormRow>
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
                onChange={handleInputChange("dateOfEstablishment")} 
                error={!!errors.dateOfEstablishment} 
                helperText={errors.dateOfEstablishment || `Established within 2 years`} 
                inputProps={{ min: twoYearsAgo, max: today }} 
              />
              <TextField 
                select 
                label="Primary Sector *" 
                value={formData.primarySector} 
                onChange={handleInputChange("primarySector")} 
                error={!!errors.primarySector} 
                helperText={errors.primarySector}
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
                helperText="Optional focus area"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="HealthTech">HealthTech</MenuItem>
                <MenuItem value="FinTech">FinTech</MenuItem>
                <MenuItem value="EdTech">EdTech</MenuItem>
                <MenuItem value="AI / ML">AI / ML</MenuItem>
              </TextField>
            </FormRow>

            <FormRow>
              <TextField 
                label="Current Team Size *" 
                type="number" 
                value={formData.currentTeamSize} 
                onChange={handleInputChange("currentTeamSize")} 
                placeholder="Total Employees Excl. Founders" 
                error={!!errors.currentTeamSize} 
                helperText={errors.currentTeamSize} 
              />
              <TextField 
                label="Male Employees *" 
                type="number" 
                value={formData.maleCount} 
                onChange={handleInputChange("maleCount")} 
                error={!!errors.maleCount} 
                helperText={errors.maleCount} 
                placeholder="Number of Male Staff"
                inputProps={{ min: 0 }}
              />
              <TextField 
                label="Female Employees *" 
                type="number" 
                value={formData.femaleCount} 
                onChange={handleInputChange("femaleCount")} 
                error={!!errors.femaleCount} 
                helperText={errors.femaleCount} 
                placeholder="Number of Female Staff"
                inputProps={{ min: 0 }}
              />
              <TextField 
                label="Number of Branches *" 
                type="number" 
                value={formData.numberOfBranches} 
                onChange={handleBranchCountChange} 
                error={!!errors.numberOfBranches} 
                helperText={errors.numberOfBranches} 
                inputProps={{ min: 1, max: 20 }} 
              />
              <TextField 
                label="Company Website" 
                value={formData.companyWebsite} 
                onChange={handleInputChange("companyWebsite")} 
                placeholder="Ex: https://www.startup.com" 
              />
            </FormRow>
          </CardContent>
        </Card>

        {/* --- SECTION: BRANCH ADDRESSES --- */}
        {formData.branchAddresses.map((address, index) => {
          const currentLists = addressArrays[index] || { states: [], districts: [], cities: [] };
          return (
            <Card key={index} sx={{ mb: 3, border: '2px solid #1f4d3a' }}>
              <Box sx={{ backgroundColor: '#1f4d3a', color: 'white', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                  {`Registered Office Address ${index + 1}`} {address.isPrimary ? "(Main)" : ""}
                </Typography>
                {!address.isPrimary && (
                  <Button 
                    variant="contained" 
                    size="small" 
                    onClick={() => handleSetMainAddress(index)} 
                    sx={{ backgroundColor: 'white', color: '#1f4d3a', '&:hover': { backgroundColor: '#e0e0e0' } }}
                  >
                    Set as Main
                  </Button>
                )}
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
                    helperText={errors[`address_${index}_country`] ? 'Required' : ''}
                  >
                    {countryList.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </TextField>
                  <TextField 
                    select 
                    label="State *" 
                    value={address.state} 
                    onChange={(e) => handleStateChange(index, e)} 
                    disabled={!address.country || isLoading.states} 
                    error={!!errors[`address_${index}_state`]} 
                    helperText={errors[`address_${index}_state`] ? 'Required' : ''}
                  >
                    {currentLists.states.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                  </TextField>
                  <TextField 
                    select 
                    label="District *" 
                    value={address.district} 
                    onChange={(e) => handleDistrictChange(index, e)} 
                    disabled={!address.state || isLoading.districts} 
                    error={!!errors[`address_${index}_district`]} 
                    helperText={errors[`address_${index}_district`] ? 'Required' : ''}
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
                      helperText={errors[`address_${index}_city`] ? 'Required' : ''}
                    >
                      {currentLists.cities.map((c, i) => <MenuItem key={`${c.name}-${i}`} value={c.name}>{c.name}</MenuItem>)}
                    </TextField>
                  ) : (
                    <TextField 
                      label="City *" 
                      value={address.city} 
                      onChange={(e) => handleAddressFieldChange(index, 'city', e.target.value)} 
                      placeholder="Enter City Name"
                      error={!!errors[`address_${index}_city`]} 
                      helperText={errors[`address_${index}_city`] ? 'Required' : ''} 
                    />
                  )}
                </FormRow>
                <FormRow>
                  <TextField 
                    label="Area / Locality *" 
                    value={address.area} 
                    onChange={(e) => handleAddressFieldChange(index, 'area', e.target.value)} 
                    placeholder="Enter locality details"
                    error={!!errors[`address_${index}_area`]} 
                    helperText={errors[`address_${index}_area`] ? 'Area / Locality is required' : ''} 
                  />
                  <TextField 
                    label="Pin Code *" 
                    value={address.pinCode} 
                    onChange={(e) => handleAddressFieldChange(index, 'pinCode', e.target.value)} 
                    placeholder="Ex: 110001"
                    error={!!errors[`address_${index}_pinCode`]} 
                    helperText={errors[`address_${index}_pinCode`] ? 'Required' : ''} 
                  />
                </FormRow>
                <FormRow>
                  <TextField 
                    label="Full Address (Street / Building / Door No) *" 
                    multiline 
                    rows={2} 
                    value={address.fullAddress} 
                    onChange={(e) => handleAddressFieldChange(index, 'fullAddress', e.target.value)} 
                    placeholder="Enter detailed street address" 
                    error={!!errors[`address_${index}_fullAddress`]} 
                    helperText={errors[`address_${index}_fullAddress`] ? 'Full Address is required' : ''} 
                  />
                </FormRow>
              </CardContent>
            </Card>
          );
        })}

        {/* --- SECTION: PERSONAL INFORMATION --- */}
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
                placeholder="Applicant First Name"
              />
              <TextField 
                label="Last Name *" 
                value={formData.lastName} 
                onChange={handleInputChange('lastName')} 
                error={!!errors.lastName} 
                helperText={errors.lastName} 
                placeholder="Applicant Last Name"
              />
              <TextField 
                label="Email Address *" 
                type="email" 
                value={formData.email} 
                onChange={(e) => { 
                  const val = e.target.value; 
                  handleInputChange('email')(e); 
                  if (val && !emailRegex.test(val)) setErrors(prev => ({ ...prev, email: "Enter a valid email address" })); 
                }} 
                error={!!errors.email} 
                helperText={errors.email} 
                placeholder="Ex: name@gmail.com"
              />
            </FormRow>
            <FormRow>
              <TextField 
                label="Phone Number *" 
                value={formData.phone} 
                onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value.replace(/\D/g, '') }))} 
                inputProps={{ maxLength: 10 }} 
                error={!!errors.phone} 
                helperText={errors.phone} 
                placeholder="10-digit mobile number"
                InputProps={{ 
                  startAdornment: (
                    <InputAdornment position="start">
                      <Select 
                        value={formData.phoneCountry} 
                        onChange={handlePhoneCountryChange} 
                        variant="standard" 
                        disableUnderline
                      >
                        {PHONE_COUNTRIES.map((c) => <MenuItem key={c.name} value={c.name}>{c.code}</MenuItem>)}
                      </Select>
                    </InputAdornment>
                  ) 
                }} 
              />
              <TextField 
                label="LinkedIn Profile URL" 
                value={formData.linkedin} 
                onChange={handleInputChange('linkedin')} 
                placeholder="Ex: https://linkedin.com/in/username"
              />
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
                placeholder="Ex: CEO / Managing Director"
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

        {/* --- SECTION: FOUNDER DETAILS --- */}
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
                placeholder="First Name"
              />
              <TextField 
                label="Founder Last Name *" 
                value={formData.founderLastName} 
                onChange={handleInputChange('founderLastName')} 
                error={!!errors.founderLastName} 
                helperText={errors.founderLastName} 
                placeholder="Last Name"
              />
              <TextField 
                label="Founder Email *" 
                type="email" 
                value={formData.founderEmail} 
                onChange={(e) => { 
                  const val = e.target.value; 
                  handleInputChange('founderEmail')(e); 
                  if (val && !emailRegex.test(val)) setErrors(prev => ({ ...prev, founderEmail: "Enter a valid email" })); 
                }} 
                error={!!errors.founderEmail} 
                helperText={errors.founderEmail} 
                placeholder="Ex: founder@startup.com"
              />
            </FormRow>
            <FormRow>
              <TextField 
                label="Founder Phone Number *" 
                value={formData.founderPhone} 
                onChange={(e) => setFormData(p => ({ ...p, founderPhone: e.target.value.replace(/\D/g, '') }))} 
                inputProps={{ maxLength: 10 }} 
                error={!!errors.founderPhone} 
                helperText={errors.founderPhone} 
                placeholder="Mobile number"
                InputProps={{ 
                  startAdornment: (
                    <InputAdornment position="start">
                      <Select 
                        value={formData.founderPhoneCountry} 
                        onChange={(e) => { 
                          const sel = PHONE_COUNTRIES.find(c => c.name === e.target.value); 
                          setFormData(p => ({ ...p, founderPhoneCountry: sel.name, founderPhoneCode: sel.code, founderPhone: '' })); 
                        }} 
                        variant="standard" 
                        disableUnderline
                      >
                        {PHONE_COUNTRIES.map((c) => <MenuItem key={c.name} value={c.name}>{c.code}</MenuItem>)}
                      </Select>
                    </InputAdornment>
                  ) 
                }} 
              />
              <TextField 
                label="Founder LinkedIn Profile" 
                value={formData.founderLinkedIn} 
                onChange={handleInputChange('founderLinkedIn')} 
                placeholder="LinkedIn Profile URL" 
              />
              <TextField 
                label="Founder Facebook Profile" 
                value={formData.founderFacebook} 
                onChange={handleInputChange('founderFacebook')} 
                placeholder="Facebook Profile URL" 
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

        {/* --- SECTION: OPPORTUNITIES --- */}
        <Card sx={{ mb: 3, border: '2px solid #1f4d3a' }}>
          <Box sx={{ backgroundColor: '#1f4d3a', color: 'white', p: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '20px' }}>Opportunities for Students / Job Seekers</Typography>
          </Box>
          <CardContent sx={{ px: 4, py: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, columnGap: 6, rowGap: 4 }}>
              <FormControl error={!!errors.placementOffered}>
                <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Do you offer Placements?</FormLabel>
                <RadioGroup row value={formData.placementOffered} onChange={handleInputChange('placementOffered')}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                {errors.placementOffered && <FormHelperText>{errors.placementOffered}</FormHelperText>}
              </FormControl>
              {formData.placementOffered === 'Yes' && (
                <FormControl error={!!errors.placementType}>
                  <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Placement Type</FormLabel>
                  <RadioGroup row value={formData.placementType} onChange={handleInputChange('placementType')}>
                    <FormControlLabel value="On-Campus" control={<Radio />} label="On-Campus" />
                    <FormControlLabel value="Off-Campus" control={<Radio />} label="Off-Campus" />
                    <FormControlLabel value="Both" control={<Radio />} label="Both" />
                  </RadioGroup>
                </FormControl>
              )}
              <FormControl error={!!errors.internshipOffered}>
                <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Do you provide Internships?</FormLabel>
                <RadioGroup row value={formData.internshipOffered} onChange={handleInputChange('internshipOffered')}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
              {formData.internshipOffered === 'Yes' && (
                <FormControl error={!!errors.internshipType}>
                  <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Internship Type</FormLabel>
                  <RadioGroup row value={formData.internshipType} onChange={handleInputChange('internshipType')}>
                    <FormControlLabel value="Paid" control={<Radio />} label="Paid" />
                    <FormControlLabel value="Unpaid" control={<Radio />} label="Unpaid" />
                    <FormControlLabel value="Performance-Based" control={<Radio />} label="Performance" />
                  </RadioGroup>
                </FormControl>
              )}
              <FormControl error={!!errors.trainingOffered}>
                <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Do you offer Training / Apprenticeship?</FormLabel>
                <RadioGroup row value={formData.trainingOffered} onChange={handleInputChange('trainingOffered')}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
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
                </FormControl>
              )}
              <FormControl sx={{ gridColumn: { md: 'span 2' } }} error={!!errors.fypOffered}>
                <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Do you provide Final Year Projects?</FormLabel>
                <RadioGroup row value={formData.fypOffered} onChange={handleInputChange('fypOffered')}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
                {errors.fypOffered && <FormHelperText>{errors.fypOffered}</FormHelperText>}
              </FormControl>
            </Box>
          </CardContent>
        </Card>

        {/* --- SECTION: REQUIREMENTS --- */}
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
              </FormControl>
              <FormControl error={!!errors.mentorshipNeeded}>
                <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Mentorship Needed ?</FormLabel>
                <RadioGroup row value={formData.mentorshipNeeded} onChange={handleInputChange('mentorshipNeeded')}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
              <FormControl error={!!errors.technologySupport}>
                <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Technology Support Needed ?</FormLabel>
                <RadioGroup row value={formData.technologySupport} onChange={handleInputChange('technologySupport')}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
              <FormControl error={!!errors.incubationSpace}>
                <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Do you require Incubation / Co-working Space ?</FormLabel>
                <RadioGroup row value={formData.incubationSpace} onChange={handleInputChange('incubationSpace')}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
              <FormControl sx={{ gridColumn: { md: 'span 2' } }} error={!!errors.registrationNeeded}>
                <FormLabel sx={{ mb: 1, textAlign: 'left' }}>Registration Needed ?</FormLabel>
                <RadioGroup row value={formData.registrationNeeded} onChange={handleInputChange('registrationNeeded')}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
              
              <TextField 
                multiline 
                rows={3} 
                label="Internship interest" 
                value={formData.supportInterest || ''} 
                onChange={handleInputChange('supportInterest')} 
                placeholder="Briefly describe your interest in providing internship support"
              />
              <TextField 
                multiline 
                rows={3} 
                label="Govt schemes eligibility" 
                value={formData.governmentSchemes || ''} 
                onChange={handleInputChange('governmentSchemes')} 
                placeholder="List specific schemes you are interested in checking eligibility for"
              />
            </Box>
          </CardContent>
        </Card>

        {/* --- SECTION: SUBMIT BUTTONS --- */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="contained" 
            size="large" 
            onClick={handleSubmit} 
            sx={{ backgroundColor: '#1f4d3a', '&:hover': { backgroundColor: '#0f7e16ff' }, px: 4, py: 1.5 }}
          >
            SUBMIT APPLICATION
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            onClick={handleReset} 
            sx={{ borderColor: '#f44336', color: '#f44336', '&:hover': { borderColor: '#d32f2f', backgroundColor: '#ffebee' }, px: 4, py: 1.5 }}
          >
            RESET FORM
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;