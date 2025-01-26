import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'; // SweetAlert import

const LoanApplicationForm = () => {
  const [loanCategory, setLoanCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPeriod, setLoanPeriod] = useState('');
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    cnic: '',
    contactNumber: '',
    email: '',
    address: '',
    phoneNumber: '',
    city: '', // Added city
    country: '', // Added country
  });
  const [guarantors, setGuarantors] = useState([{ name: '', email: '', location: '', cnic: '' }, { name: '', email: '', location: '', cnic: '' }]);
  const [documents, setDocuments] = useState({ statement: '', salarySheet: '' });

  // Loan categories and details
  const loanDetails = {
    wedding: {
      subCategories: ['Valima', 'Furniture', 'Valima Food', 'Jahez'],
      maxLoan: 500000,
      loanPeriod: 3,
    },
    home: {
      subCategories: ['Structure', 'Finishing', 'Loan'],
      maxLoan: 1000000,
      loanPeriod: 5,
    },
    business: {
      subCategories: ['Buy Stall', 'Advance Rent for Shop', 'Shop Assets', 'Shop Machinery'],
      maxLoan: 1000000,
      loanPeriod: 5,
    },
    education: {
      subCategories: ['University Fees', 'Child Fees Loan'],
      maxLoan: 'Based on requirement',
      loanPeriod: 4,
    },
  };

  const handleLoanCategoryChange = (e) => {
    setLoanCategory(e.target.value);
    setSubCategory(''); // Reset subcategory when changing category
    setLoanAmount('');
    setLoanPeriod('');
  };

  const handleDownloadSlip = (tokenNumber, qrCode) => {
    const slipContent = `Token: ${tokenNumber}\nQR Code: ${qrCode}\nAppointment Details: 2025-01-30, 10:00 AM, Main Office`;

    const blob = new Blob([slipContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'loan_application_slip.txt';
    link.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show SweetAlert for confirmation
    Swal.fire({
      title: 'Application Submitted!',
      text: 'Your loan application has been successfully submitted.',
      icon: 'success',
      confirmButtonText: 'OK',
    });

    // Generate slip after submission (Token, QR, Appointment)
    const tokenNumber = Math.floor(Math.random() * 10000); // Random token number
    const qrCode = 'https://www.example.com/qr/' + tokenNumber; // Simulating QR Code URL

    // Reset form fields
    setLoanCategory('');
    setSubCategory('');
    setLoanAmount('');
    setLoanPeriod('');
    setPersonalInfo({
      fullName: '',
      cnic: '',
      contactNumber: '',
      email: '',
      address: '',
      phoneNumber: '',
      city: '', // Reset city
      country: '', // Reset country
    });
    setGuarantors([{ name: '', email: '', location: '', cnic: '' }, { name: '', email: '', location: '', cnic: '' }]);
    setDocuments({ statement: '', salarySheet: '' });

    // Generate and show the slip with QR code
    Swal.fire({
      title: 'Slip Generated',
      text: `Token: ${tokenNumber} \n QR Code: ${qrCode} \n Appointment Details: 2025-01-30, 10:00 AM, Main Office`,
      icon: 'info',
      confirmButtonText: 'Download Slip',
      preConfirm: () => handleDownloadSlip(tokenNumber, qrCode), // Call download when user clicks on the button
    });
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', display: 'flex' }}
    >
      <div className="card p-4" style={{ width: '100%', maxWidth: '800px' }}>
        <h2 className="text-center mb-4">Loan Application Form</h2>
        <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
          {/* Personal Information */}
          <div className="mb-4">
            <h3 className="mb-3">1. Personal Information</h3>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Full Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={personalInfo.fullName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">CNIC:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={personalInfo.cnic}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, cnic: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Contact Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={personalInfo.contactNumber}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, contactNumber: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Email Address:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">City:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={personalInfo.city}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Country:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={personalInfo.country}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, country: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Loan Category */}
          <div className="mb-4">
            <h3 className="mb-3">2. Select Loan Category</h3>
            <select
              className="form-select"
              value={loanCategory}
              onChange={handleLoanCategoryChange}
              required
            >
              <option value="">Select Category</option>
              <option value="wedding">Wedding Loans</option>
              <option value="home">Home Construction Loans</option>
              <option value="business">Business Startup Loans</option>
              <option value="education">Education Loans</option>
            </select>
          </div>

          {/* Loan Subcategory */}
          {loanCategory && (
            <div className="mb-4">
              <h3 className="mb-3">3. Select Loan Subcategory</h3>
              <select
                className="form-select"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                required
              >
                <option value="">Select Subcategory</option>
                {loanDetails[loanCategory]?.subCategories.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Loan Details */}
          {loanCategory && (
            <div className="mb-4">
              <h3 className="mb-3">4. Loan Details</h3>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Loan Amount (PKR):</label>
                    <input
                      type="number"
                      className="form-control"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      max={loanDetails[loanCategory]?.maxLoan}
                      min="1"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Loan Period (Years):</label>
                    <select
                      className="form-select"
                      value={loanPeriod}
                      onChange={(e) => setLoanPeriod(e.target.value)}
                      required
                    >
                      <option value="">Select Loan Period</option>
                      {[...Array(loanDetails[loanCategory]?.loanPeriod)].map((_, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1} Year{index + 1 > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Guarantors */}
          <div className="mb-4">
            <h3 className="mb-3">5. Guarantor Information</h3>
            {guarantors.map((guarantor, index) => (
              <div key={index} className="row mb-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Guarantor {index + 1} Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={guarantor.name}
                      onChange={(e) => {
                        const newGuarantors = [...guarantors];
                        newGuarantors[index].name = e.target.value;
                        setGuarantors(newGuarantors);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Guarantor {index + 1} Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      value={guarantor.email}
                      onChange={(e) => {
                        const newGuarantors = [...guarantors];
                        newGuarantors[index].email = e.target.value;
                        setGuarantors(newGuarantors);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Guarantor {index + 1} Location:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={guarantor.location}
                      onChange={(e) => {
                        const newGuarantors = [...guarantors];
                        newGuarantors[index].location = e.target.value;
                        setGuarantors(newGuarantors);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Guarantor {index + 1} CNIC:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={guarantor.cnic}
                      onChange={(e) => {
                        const newGuarantors = [...guarantors];
                        newGuarantors[index].cnic = e.target.value;
                        setGuarantors(newGuarantors);
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Documents */}
          <div className="mb-4">
            <h3 className="mb-3">6. Documents</h3>
            <div className="mb-3">
              <label className="form-label">Bank Statement:</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setDocuments({ ...documents, statement: e.target.files[0] })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Salary Sheet:</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setDocuments({ ...documents, salarySheet: e.target.files[0] })}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanApplicationForm;


