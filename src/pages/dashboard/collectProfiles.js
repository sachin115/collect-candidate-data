import { React, useState } from 'react';
import { Box, TextField, Button, Container, Typography, MenuItem, Select, FormControl, InputLabel, Autocomplete, Chip } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";


const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required'),
  contactNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Contact Number must be exactly 10 digits')
    .required('Contact Number is required'),
  emailId: Yup.string().email('Invalid email address').required('Email ID is required'),
  designation: Yup.string().required('Designation is required'),
  experience: Yup.string().required('Experience is required'),
  skills: Yup.array().min(1, 'At least one skill is required').required('Skills are required'),
  location: Yup.string().required('Location is required'),
  resume: Yup.mixed().required('Resume is required'),
});

const experienceOptions = [
  '0-2', '2-4', '4-6', '6-8', '8-10', '10+'
];

const skillsOptions = [
  'JavaScript', 'Python', 'Java', 'C#', 'PHP', 'C++', 'TypeScript', 'Ruby', 'Swift', 'Go', 'Kotlin', 'Rust', 'SQL', 'NoSQL', 'HTML', 'CSS', 'React', 'Angular', 'Vue.js', 'Node.js', 'Django', 'Flask', 'Spring', 'Hibernate', 'Laravel', 'Symfony', 'ASP.NET', 'Express.js', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'Docker', 'Kubernetes', 'Git', 'CI/CD', 'AWS', 'Azure', 'GCP', 'Linux', 'Windows', 'macOS', 'Agile', 'Scrum', 'DevOps'
];

const CollectProfiles = () => {
  const [resumeName, setResumeName] = useState('');

  const formik = useFormik({
    initialValues: {
      fullName: '',
      contactNumber: '',
      emailId: '',
      designation: '',
      experience: '',
      skills: '',
      location: '',
      resume: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const handleKeyPress = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };
  const handleResumeChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue('resume', file);
    if (file) {
      setResumeName(file.name);
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 5,
            height: "105vh"
          }}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <Typography variant="h4" sx={{ color: "white" }}>
            Collect Candidate Profiles
          </Typography>
          <TextField
            size="small"
            required
            id="fullName"
            label="Full Name"
            variant="outlined"
            {...formik.getFieldProps('fullName')}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
          <TextField
            size="small"
            required
            id="contactNumber"
            label="Contact Number"
            variant="outlined"
            inputProps={{ maxLength: 10 }}
            {...formik.getFieldProps('contactNumber')}
            error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
            helperText={formik.touched.contactNumber && formik.errors.contactNumber}
            onKeyPress={handleKeyPress}
          />
          <TextField
            size="small"
            required
            id="emailId"
            label="Email ID"
            variant="outlined"
            type="email"
            {...formik.getFieldProps('emailId')}
            error={formik.touched.emailId && Boolean(formik.errors.emailId)}
            helperText={formik.touched.emailId && formik.errors.emailId}
          />
          <TextField
            size="small"
            required
            id="designation"
            label="Designation"
            variant="outlined"
            {...formik.getFieldProps('designation')}
            error={formik.touched.designation && Boolean(formik.errors.designation)}
            helperText={formik.touched.designation && formik.errors.designation}
          />
          <FormControl variant="outlined" size="small" sx={{ m: 1, width: '100%' }}>
            <InputLabel id="experience-label">Experience</InputLabel>
            <Select
              labelId="experience-label"
              id="experience"
              label="Experience"
              {...formik.getFieldProps('experience')}
              error={formik.touched.experience && Boolean(formik.errors.experience)}
            >
              {experienceOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.experience && formik.errors.experience && (
              <Typography variant="body2" color="error">
                {formik.errors.experience}
              </Typography>
            )}
          </FormControl>

          <Autocomplete
            sx={{ mr: "15px" }}
            fullWidth
            size='small'
            multiple
            id="skills"
            options={skillsOptions}
            getOptionLabel={(option) => option}
            onChange={(event, value) => formik.setFieldValue('skills', value)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip size='small' key={option} label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Skills"
                variant="outlined"
                size="small"
                error={formik.touched.skills && Boolean(formik.errors.skills)}
                helperText={formik.touched.skills && formik.errors.skills}
              />
            )}
          />

          <TextField
            size="small"
            required
            id="location"
            label="Location"
            variant="outlined"
            {...formik.getFieldProps('location')}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Button
              size="small"
              variant="contained"
              component="label"
            >
              Upload Resume
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
              />
            </Button>
            {resumeName && (
              <Typography sx={{ ml: 2 }}>
                {resumeName}
              </Typography>
            )}
          </Box>
          {formik.touched.resume && formik.errors.resume ? (
            <div style={{ color: 'red', marginTop: '10px' }}>{formik.errors.resume}</div>
          ) : null}
          <Button size="small" variant="contained" color="primary" sx={{ mt: 3 }} type="submit">
            Submit
          </Button>
        </Box>
      </Container></>

  );
};

export default CollectProfiles;
