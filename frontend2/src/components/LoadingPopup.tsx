import React from 'react';

interface LoadingPopupProps {
    text: string;
    isLoading?: boolean;
}

const LoadingPopup: React.FC<LoadingPopupProps> = ({ text, isLoading = false }) => {
    if (!isLoading) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
            }}
        >
            <div
                style={{
                    backgroundColor: 'rgb(77, 77, 77)',
                    padding: '20px',
                    borderRadius: '8px',
                    textAlign: 'center',
                }}
            >
                <div>{text}</div>
                <div
                    style={{
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #3498db',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        animation: 'spin 1s linear infinite',
                        margin: '10px auto',
                    }}
                />
                <style>
                    {`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}
                </style>
            </div>
        </div>
    );
};

export default LoadingPopup;