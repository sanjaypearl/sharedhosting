import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ThankYou = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const previousPage = location.state?.from || '/';
        const timer = setTimeout(() => {
            navigate(previousPage);
        }, 5000); 

        return () => clearTimeout(timer);
    }, [location, navigate]);

    return (
        <div class="thankyou_section content py-5">
            <div class="wrapper-1">
                <div class="wrapper-2">
                    <h1>Thank you !</h1>
                    <p>Your request has been submitted successfully.</p>
                    <div class="go-home">You'll be redirected back in 5 seconds...</div>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;
