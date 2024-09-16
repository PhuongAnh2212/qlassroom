import Image from "next/image";
import PropTypes from 'prop-types';

export const Logo = ({ width = 80, height = 40 }) => {
    return (
        <div style={{ width: `${width}px`, height: `${height}px`, position: 'relative' }}>
            <Image
                alt="logo"
                src="/logo.svg"
                layout="fill"
                objectFit="contain" // Ensures the image scales correctly
            />
        </div>
    );
};

// Define the expected prop types and defaults
Logo.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
};
