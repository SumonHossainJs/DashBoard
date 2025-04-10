import { useState } from "react";
import "../multi.scss";
import {  Progress } from "antd";
import Swal from 'sweetalert2';






const MultiStepForm2 = ({steps,formData, setFormData, stepFields,cat, title}) => {
const totalSteps = steps.length;
  const [currentStep, setCurrentStep] = useState(0);
  

  const [hasExistingWebsite, setHasExistingWebsite] = useState(false);
  const [formActive, setFormActive] = useState(true);
  
  

  const handleNext = () => {
    if (currentStep === totalSteps - 1) {
      console.log("Form Data:", formData);
      Swal.fire({
        title: "Thank you",
        text: 'Successfully submited',
        icon: 'success',
        timer: 2500,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      setFormActive(false);
    }
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleYesCheckboxChange = () => {
    setHasExistingWebsite(true);
    setFormData((prevData) => ({ ...prevData, hasExistingWebsite: true }));
  };

  const handleNoCheckboxChange = () => {
    setHasExistingWebsite(false);
    setFormData((prevData) => ({ ...prevData, hasExistingWebsite: false }));
  };

  const calculatePercent = () => {
    return Math.round(((currentStep + 1) / totalSteps) * 100);
  };

  return (
 
<div className="multi-con">
  {formActive && (
    <div className="form_container">
      <Progress percent={calculatePercent()} />
      <h3 className="title mb--10">{steps[currentStep]}</h3>
      <form className=".form">
        <div className="row row--10">
          {stepFields[currentStep].map((field, index) => (
            <div key={index} className="col-lg-6">
              {field.type === 'checkbox' ? (
                <div className="form-group">
                  <div className="check_box">
                    <label>{field.label}</label>
                    <div className="bellow">
                      <label>
                        <input
                          type="checkbox"
                          checked={hasExistingWebsite}
                          onChange={handleYesCheckboxChange}
                        />
                        Yes
                      </label>
  
                      <label>
                        <input
                          type="checkbox"
                          checked={!hasExistingWebsite}
                          onChange={handleNoCheckboxChange}
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="form-group">
                  <label>
                    {field.label} {field.type === 'checkbox' && <span>*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      className="small"
                      name={field.name}
                      value={field.value || ""}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={field.value || ""}
                      onChange={handleInputChange}
                    />
                  )}
                  {errors[field.name] && <p className="error">Field is required.</p>}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="step-btns">
          {currentStep > 0 ? (
            <button
              className="axil-btn btn-bg-Secondary"
              type="button"
              onClick={handlePrevious}
            >
              Previous
            </button>
          ) : (
            <div></div>
          )}

          <button
            className="axil-btn btn-bg-primary"
            type="button"
            onClick={handleNext}
          >
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </div>
  )}
  {!formActive && (
    <h1>the process is completed </h1>
  )}
</div>


  );
};

export default MultiStepForm2;
