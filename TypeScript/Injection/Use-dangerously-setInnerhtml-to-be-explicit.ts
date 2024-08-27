import React from 'react';

interface Props {
    htmlContent: string;
}

const DangerousComponent: React.FC<Props> = ({ htmlContent }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};

export default DangerousComponent;
