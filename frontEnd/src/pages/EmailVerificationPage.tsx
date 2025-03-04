import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const EmailVerificationPage: React.FC = () => {
    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();


    const {isLoading,verifyEmail} = useAuthStore();

    const handleChange = (index: number, value: string) => {
        const newCode = [...code];

        // If the value length is greater than 1 (handling pasted text)
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            pastedCode.forEach((digit, i) => {
                newCode[i] = digit || "";
            });
            setCode(newCode);
            
            // Focus on the next empty field
            const nextEmptyIndex = newCode.findIndex((digit) => digit === "");
            if (nextEmptyIndex !== -1) {
                inputRefs.current[nextEmptyIndex]?.focus();
            }
        } else {
            newCode[index] = value;
            setCode(newCode);

            // Move focus to the next input field if value is entered
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Move focus to the previous input field if backspace is pressed and the current input is empty
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();
        
        if (/^\d{6}$/.test(pastedData)) { // Ensure it's exactly 6 digits
            const newCode = pastedData.split("");
            setCode(newCode);
            // Auto-focus the last filled input
            inputRefs.current[5]?.focus();
        }
    };

    const handleSubmit = useCallback(async() => {
        const verificationCode = code.join("");
        if (!verifyEmail) {
            console.error("verifyEmail is undefined");
            toast.error("Something went wrong. Please try again.");
            return;  // Prevent further execution
        }
        try {
            await verifyEmail(verificationCode);
            navigate("/");
            toast.success("Email verified successfully");
        }catch(error){
            console.log(error);
            toast.error("Invalid or Expired Verification code");

        }
        // You can replace this with actual verification logic, e.g., API call
    }, [code,verifyEmail,navigate]);


    useEffect(() => {
        if (code.every(digit => digit !== '')) {
            handleSubmit(); // Directly call the function when all digits are entered
        }
    }, [code, handleSubmit]);

    return (
        <div className='mx-auto max-w-md w-full px-4'>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 20 }}
                transition={{ duration: 0.5 }}
                className='mx-auto max-w-md w-full h-[300px] pt-6 my-6 px-7 bg-green-200 bg-opacity-50 backdrop-filter backdrop-blur-xl border-2 border-green-500 rounded-2xl shadow-xl overflow-hidden'
            >
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-500 to-emerald-600 text-transparent bg-clip-text'>
                    Verification
                </h2>
                <p className='text-center text-gray-600 mb-6'>Enter the 6-digit code sent to your email address.</p>
                <form onSubmit={(e) => {e.preventDefault();handleSubmit();}} className='space-y-6'>
                    <div className='flex justify-between'>
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type='text'
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste} 
                                className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-500 rounded-lg focus:border-green-500 focus:outline-none'
                            />
                        ))}
                    </div>
                
                    <motion.button
                        className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type='submit'
                        disabled={isLoading || code.some((digit) => !digit)}
                    >
                        {isLoading ? 'Verifying...' : 'Verify Email'}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default EmailVerificationPage;
