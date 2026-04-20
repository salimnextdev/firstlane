import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '@/modules/auth/state/authSlice';
import { fetchLGA, uploadFile } from '@/modules/kyc/state/kycSlice';
import { getCookie } from '@/utils/cookieUtils';

import { ReactComponent as KYC_Upload } from '@/assets/icons/kyc_upload.svg';
import Avatar from '@/assets/images/avatar.png';

import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import DateInput from '@/components/FormInputs/DateInput';
import PlacesInput from '@/components/FormInputs/PlacesInput';
import SearchInput from '@/components/FormInputs/searchInput';
import StatesInput from '@/components/FormInputs/StatesInput';
import LGAInput from '@/components/FormInputs/LGAInputs';
import { genderOptions, maritalStatusOptions, titleOptions } from '@/utils/dropdownOptions';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';

import { GetCountries, GetState } from 'react-country-state-city';

const Profile = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(getCookie('user') || null);
    const { userProfile: userProfile, loading: loading, error: error } = useSelector((state) => state.auth);
    useEffect(() => {
        if (!userProfile) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch]);

    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        profile_image: null,
        title: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        date_of_birth: "",
        gender: "",
        marital_status: "",
        address: "",
        state: "",
        lga: "",
    });

    useEffect(() => {
        setFormData({
            profile_image: userProfile?.profileImage,
            title: userProfile?.title || "",
            firstname: userProfile?.firstname || "",
            lastname: userProfile?.lastname || "",
            email: userProfile?.email || "",
            phone: userProfile?.phone || "",
            date_of_birth: userProfile?.dob || "",
            gender: userProfile?.gender || "",
            marital_status: userProfile?.maritalStatus || "",
            address: userProfile?.residentialAddress || "",
            nationality: userProfile?.country || "",
            state: userProfile?.state || "",
            lga: userProfile?.localGovernmentArea || "",
        })
    }, [userProfile]);

    const [countriesList, setCountriesList] = useState([]);
    const [stateList, setStateList] = useState([]);
    useEffect(() => {
        GetCountries().then((result) => {
            // format coutries list to match my SearchInput data format
            setCountriesList(result.map(item => ({ ...item, label: item.name, value: item.name })));
        });
    }, [dispatch]);
    useEffect(() => {
        const countryID = formData.nationality && countriesList.find(item => item.name === formData.nationality);
        if (countryID) {
            GetState(parseInt(countryID.id)).then((result) => {
                setStateList(result.map(item => ({ ...item, label: item.name, value: item.name })));
            });
        };
    }, [dispatch, userProfile, formData.nationality]);

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        if (name == 'nationality' && value !== 'Nigeria') {
            setFormData((prev) => ({
                ...prev,
                state: 'others',
                lga: 'others',
            }));
            toast.warning("States and LGA are disabled for countries other than Nigeria");
        };
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'file' ? { file: files[0] } : value,
        }));
    };
    const handleDateOfBirthChange = (date) => {
        setFormData((prev) => ({
            ...prev,
            date_of_birth: date,
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.profile_image) errors.profile_image = "Profile Image is required";
        if (!formData.phone) errors.phone = "Phonoe is required";
        if (!formData.gender) errors.gender = "Gender is required";
        if (!formData.date_of_birth) errors.date_of_birth = "Date of Birth is required";
        if (!formData.marital_status) errors.marital_status = " is required";
        if (!formData.address) errors.address = "Residential address is required";
        if (!formData.nationality) errors.nationality = "Nationality is required";
        if (!formData.state) errors.state = "State is required";
        if (!formData.lga) errors.lga = "LGA is required";
        return errors;
    };

    const submitProfile = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            Object.values(validationErrors).map(error => {
                toast(error);
            });
            return;
        };

        setSubmitted(true);
        try {
            // uploadFile (kycSlice) expects the raw File — same as KYC step 1 / loan flows.
            let profileImageUrl;
            if (formData.profile_image?.file instanceof File) {
                const uploadResult = await dispatch(
                    uploadFile(formData.profile_image.file)
                ).unwrap();
                profileImageUrl = uploadResult?.data?.[0]?.url;
                if (!profileImageUrl) {
                    toast.error('Profile upload failed', {
                        description:
                            'Upload succeeded but no file URL was returned.',
                    });
                    return;
                }
            } else {
                profileImageUrl =
                    typeof formData.profile_image === 'string'
                        ? formData.profile_image
                        : null;
            }

            const data = {
                profileImage: profileImageUrl,
                title: formData.title,
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                phone: formData.phone,
                gender: formData.gender,
                dob: formData.date_of_birth,
                state: formData.state,
                country: formData.nationality,
                localGovernmentArea: formData.lga,
                maritalStatus: formData.marital_status,
                residentialAddress: formData.address?.display_name || formData.address
            };

            await dispatch(updateUserProfile(data)).unwrap();
            toast.success('Profile updated successfully!');
        } catch (error) {
            // unwrap rejects with rejectWithValue payload { message } or a serialized error
            toast.error('An error occurred', {
                description:
                    error?.message ||
                    'Something went wrong. Please try again.',
            });
        } finally {
            setSubmitted(false);
        }
    };

    return (
        <div className="space-y-4 pb-20 md:pb-0">
            <p className={`hidden px-3 py-1 md:inline-block text-xs ${userProfile?.verifications?.status === 'verified' ? 'bg-success' : 'bg-warning'} rounded-full`}>
                {userProfile?.verifications?.status === 'verified' ? 'KYC verified' : 'KYC pending'}
            </p>
            <form onSubmit={submitProfile} method='post' className='w-full space-y-4'>
                <div className='space-y-1'>
                    <p className='text-sm font-normal'>Profile Picture</p>
                    <div className='flex items-center gap-5'>
                        <div className='w-[64px] h-[64px] flex items-center justify-center bg-currency border border-gray overflow-hidden rounded-lg'>
                            {formData.profile_image ? (
                                <img
                                    src={
                                        typeof formData.profile_image === 'string'
                                            ? formData.profile_image
                                            : URL.createObjectURL(formData.profile_image.file) || Avatar
                                    }
                                    alt="Profile Preview"
                                    className='w-full h-full object-cover'
                                    // Do not set crossOrigin: S3 (and many CDNs) often omit CORS for GET;
                                    // anonymous CORS mode then blocks the image from displaying.
                                />
                            ) : (
                                <KYC_Upload />
                            )}
                        </div>

                        <div className='w-[122px] h-[36px] flex items-center justify-center border border-gray rounded-lg'>
                            <input
                                type="file"
                                id="profile_image"
                                name="profile_image"
                                accept="image/*"
                                onChange={handleChange}
                                className="top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                                hidden
                            />
                            <label htmlFor="profile_image" className='text-sm cursor-pointer'>Upload profile</label>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row items-center gap-3'>
                    <div className='w-full flex items-center gap-3'>
                        <div className='w-32 md:w-90'>
                            <SelectInput
                                label="Title"
                                name="title"
                                className='w-full text-sm'
                                value={formData.title}
                                onChange={handleChange}
                                options={titleOptions}
                                placeholder="Mr"
                            />
                        </div>
                        <TextInput
                            label="First Name"
                            name="firstname"
                            className='w-full text-sm'
                            value={formData.firstname}
                            onChange={handleChange}
                            placeholder="Adam"
                        />
                    </div>
                    <TextInput
                        label="Last Name"
                        name="lastname"
                        className='text-sm'
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Jude"
                    />
                </div>

                <div className='flex flex-col md:flex-row items-center gap-3'>
                    <TextInput
                        label="Email Address"
                        name="email"
                        type='email'
                        className='text-sm bg-currency'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="adam.jude@mail.com"
                        disabled
                    />
                    <TextInput
                        label="Phone"
                        name="phone"
                        className='text-sm'
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="08000000000"
                    />
                </div>

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                    <div className='w-full flex items-center gap-3'>
                        <DateInput
                            label="Date of Birth"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleDateOfBirthChange}
                            placeholder='DD / MM / YY'
                        />
                        <SelectInput
                            label="Gender"
                            name="gender"
                            className='text-sm'
                            value={formData.gender}
                            onChange={handleChange}
                            options={genderOptions}
                            placeholder="Select Gender"
                        />
                    </div>

                    <SelectInput
                        label="Marital Status"
                        name="marital_status"
                        className='text-sm'
                        value={formData.marital_status}
                        onChange={handleChange}
                        options={maritalStatusOptions}
                        placeholder="Select Marital Status"
                    />
                </div>

                {/* <PlacesInput
                    label="Residential address"
                    name="address"
                    className='text-sm'
                    value={formData.address}
                    onChange={(address) => {
                        setFormData({ ...formData, ['address']: address });
                    }}
                    placeholder="No 8 Amadu Bello Way, Wuse"
                /> */}

                <TextInput
                    label="Residential address"
                    name="address"
                    className='text-sm'
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="No 8 Amadu Bello Way, Wuse"
                />

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                    <SearchInput
                        label="Nationality"
                        name="nationality"
                        className='text-sm'
                        value={formData.nationality}
                        onChange={handleChange}
                        data={countriesList || []}
                        placeholder="Select Nationality"
                    />

                    <div className='w-full flex items-center gap-3'>
                        {/* <SearchInput
                            label="State"
                            name="state"
                            className='text-sm'
                            value={formData.state}
                            onChange={handleChange}
                            data={stateList || []}
                            placeholder="Select State"
                        /> */}

                        {formData.nationality === 'Nigeria' ?
                            <>
                                <StatesInput
                                    value={formData.state}
                                    onChange={handleChange}
                                    fetch={formData.nationality == 'Nigeria'}
                                    isDisabled={formData.nationality !== 'Nigeria'}
                                />

                                <LGAInput
                                    stateValue={formData.state}
                                    value={formData.lga}
                                    onChange={handleChange}
                                    fetch={formData.nationality == 'Nigeria'}
                                    isDisabled={formData.nationality !== 'Nigeria'}
                                />
                            </> :
                            <>
                                <TextInput
                                    label="State"
                                    name="state"
                                    className='text-sm'
                                    value={formData.state}
                                    onChange={handleChange}
                                    disabled
                                />
                                <TextInput
                                    label="LGA"
                                    name="lga"
                                    className='text-sm'
                                    value={formData.lga}
                                    onChange={handleChange}
                                    disabled
                                />
                            </>
                        }
                    </div>
                </div>

                <div className="fixed md:static left-0 bottom-0 z-10 w-full h-[71px] px-5 md:px-0 bg-gray-50 dark:bg-[var(--firstlane-bg)] border-t md:border-0 border-gray">
                    <button
                        className='w-full md:w-36 h-11 md:h-9 my-3 md:my-0 px-3 rounded-md bg-primary text-sm cursor-pointer'
                        disabled={submitted}
                    >
                        {submitted ?
                            <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                            'Save and continue'
                        }
                    </button>
                </div>
            </form>

        </div>
    );
};

export default Profile;