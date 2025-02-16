import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import cloudIcon from './cloud-download.png';

const AttendeeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatarUrl: '',
    specialRequest: ''
  });
  


  const handleCancel = () => {
    navigate(-1);
  }

  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem('ticketFormData');
    if (savedData) {
      try {
           setFormData(JSON.parse(savedData));
      } catch (err) {
          console.error('Error loading saved form dat:', err);
            localStorage.removeItem('ticketFormData');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ticketFormData', JSON.stringify(formData));
  }, [formData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.avatarUrl) {
      newErrors.avatar = 'Please upload a profile picture';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, avatar: 'Please upload a JPG, PNG, or GIF file' }));
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, avatar: 'File size must be less than 5MB' }));
      return;
    }

    setIsUploading(true);
    try {
        const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
      
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        uploadFormData
      );
        
      setFormData(prev => ({ ...prev, avatarUrl: response.data.secure_url }));
      setErrors(prev => ({ ...prev, avatar: undefined }));
    }   catch (err) {
      console.error('Upload error:', err);
         setErrors(prev => ({ ...prev, avatar: 'Upload failed. Please try again.' }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const ticketData = JSON.parse(localStorage.getItem('ticketData'));
      navigate("/ticketForm", { 
        state: {
          name: formData.name,
          email: formData.email,
            avatarUrl: formData.avatarUrl,
           ticketType: ticketData?.ticketType,
          specialRequest: formData.specialRequest,
          numOfTickets: ticketData?.numberOfTickets
        }
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto text-white">
      <div className="bg-[#02191D] rounded-xl shadow-md p-6 m-4">
        <div className="text-center flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Attendee Details</h1>
          <p className="text-sm">Step 2/3</p>
        </div>
        <div data-svg-wrapper>
          <svg width="420" className='mx-auto m-4 md:w-[430px] w-[350px]' height="4" viewBox="0 0 604 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_5_2229)">
              <path d="M0 2.00012C0 0.895553 0.895431 0.00012207 2 0.00012207H602C603.105 0.00012207 604 0.895553 604 2.00012C604 3.10469 603.105 4.00012 602 4.00012H2.00001C0.895441 4.00012 0 3.10469 0 2.00012Z" fill="#0E464F"/>
              <path d="M0 2.00012C0 0.895553 0.895431 0.00012207 2 0.00012207H362C363.105 0.00012207 364 0.895553 364 2.00012C364 3.10469 363.105 4.00012 362 4.00012H2.00001C0.895436 4.00012 0 3.10469 0 2.00012Z" fill="#24A0B5"/>
            </g>
            <defs>
              <clipPath id="clip0_5_2229">
                <path d="M0 2.00012C0 0.895553 0.895431 0.00012207 2 0.00012207H602C603.105 0.00012207 604 0.895553 604 2.00012C604 3.10469 603.105 4.00012 602 4.00012H2.00001C0.895441 4.00012 0 3.10469 0 2.00012Z" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className='w-full md:w-[95%] rounded-3xl mx-auto bg-[#041E23] p-5'>
          <div className="mb-8">
            <div className="border border-[#2b535c] rounded-lg p-6 text-center">
              <div className="relative">
                {formData.avatarUrl ? (
                  <div className="w-32 h-32 mx-auto mb-2">
                    <img
                      src={formData.avatarUrl}
                      alt="Profile preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 flex border-2 border-[#24a1b2] items-center justify-center rounded-xl bg-[#0E464F] mx-auto mb-2">
                    <p className="text-xs text-center p-2 flex flex-col items-center justify-center">
                      {isUploading ? (
                        'Uploading...'
                      ) : (
                        <>
                          <img src={cloudIcon} alt="Upload Icon" className="w-8 h-8 mb-2 block" />
                          Drag & drop or click to upload
                        </>
                      )}
                    </p>
                  </div>
                )}
                
                <input
                  type="file"
                   id="avatar"
                   name="avatar"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                    accept="image/jpeg,image/png,image/gif"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-describedby="avatarError"
                  disabled={isUploading}
                />
              </div>
              {errors.avatar && (
                <div id="avatarError" role="alert" className="text-red-500 text-sm mt-2">
                  {errors.avatar}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Enter your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-[#2b535c] rounded-md bg-transparent focus:outline-none focus:ring-1 focus:border-[#24a1b2]"
                aria-describedby="nameError"
              />
              {errors.name && (
                <div id="nameError" role="alert" className="text-red-500 text-sm mt-1">
                  {errors.name}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Enter your email
              </label>
              <div className="relative">
                {!formData.email && (
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22 6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6zM4 6h16l-8 5-8-5zm0 12v-9l8 5 8-5v9H4z" />
                  </svg>
                )}
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full p-2 border border-[#2b535c] rounded-md bg-transparent focus:outline-none focus:ring-1 focus:border-[#24a1b2]"
                  aria-describedby="emailError"
                />
              </div>
              {errors.email && (
                <div id="emailError" role="alert" className="text-red-500 text-sm mt-1">
                  {errors.email}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="specialRequest" className="block text-sm font-medium mb-1">
                Special request?
              </label>
              <textarea
                id="specialRequest"
                name="specialRequest"
                value={formData.specialRequest}
                onChange={handleChange}
                rows="3"
                className="w-full p-2 border border-[#2b535c] rounded-md bg-transparent focus:outline-none focus:ring-1 focus:border-[#24a1b2]"
              />
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-4 md:gap-0 justify-around my-3'>
  <button 
  onClick={handleCancel} className="w-full md:w-auto py-3 px-16 rounded-md border border-solid border-[#197686]">
    Cancel
  </button>
  <button
    type="submit"
    className="w-full md:w-auto py-3 px-6 rounded-md font-medium bg-[#197686] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {isUploading ? 'Uploading...' : 'Get My Free Ticket'}
  </button>
</div>
        </div>
      </div>
    </form>
  );
};

export default AttendeeForm;