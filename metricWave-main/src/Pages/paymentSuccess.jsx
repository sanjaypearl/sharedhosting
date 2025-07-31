import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/api';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [paymentData, setPaymentData] = useState(null); 
    const [reportData, setReportData] = useState(null);   
    const [reportKeyword, setReportKeyword] = useState(""); 
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/paypal/capture-order?token=${token}`);
                const response = res.data;
                if (response.success) {
                    setPaymentData(response.data); 

                    setReportData(response.report);

                    setReportKeyword(response.reportKeyword);

                } else {
                    setError('Payment capture failed.');
                }
            } catch (err) {
                setError('Error fetching payment details.');
                console.error(err);
            }
        };

        if (token) {
            fetchPaymentDetails();
        } else {
            setError('No payment token provided.');
        }
    }, [token]);

    return (
        <div className="container mt-5 py-5">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <div className="card shadow payment_success">
                        <div className="card-header text-white text-center">
                            <h4>🎉 Thank You for Your Payment!</h4>
                        </div>
                        <div className="card-body">
                            {error ? (
                                <p className="text-center text-danger">{error}</p>
                            ) : !paymentData ? (
                                <p className="text-center">Loading payment details...</p>
                            ) : (
                                <>
                                    <p className="text-center">
                                        Your payment was successful. Below are your payment details:
                                    </p>
                                    <table className="table table-bordered">
                                        <tbody>
                                            {reportData && (
                                            <>
                                                <tr>
                                                    <th>Report Name</th>
                                                    <td>
                                                        {reportData.report_metas.keyword}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Report ID</th>
                                                    <td>
                                                        {reportData.report_id}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Report Category</th>
                                                    <td>
                                                        {reportData.industry}
                                                    </td>
                                                </tr>
                                            </>
                                            )}
                                            <tr>
                                                <th>Order ID</th>
                                                <td>{paymentData.id}</td>
                                            </tr>
                                            <tr>
                                                <th>Capture ID</th>
                                                <td>
                                                    {paymentData.purchase_units?.[0]?.payments?.captures?.[0]?.id}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Status</th>
                                                <td>{paymentData.status}</td>
                                            </tr>
                                            <tr>
                                                <th>Amount</th>
                                                <td>
                                                    {
                                                        paymentData.purchase_units?.[0]?.payments?.captures?.[0]?.amount
                                                            ?.value
                                                    }{' '}
                                                    {
                                                        paymentData.purchase_units?.[0]?.payments?.captures?.[0]?.amount
                                                            ?.currency_code
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Payer ID</th>
                                                <td>{paymentData.payer?.payer_id}</td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td>{paymentData.payer?.email_address}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
