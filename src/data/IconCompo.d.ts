import React from 'react';

interface SvgIcnProps extends React.SVGProps<SVGSVGElement> {
    Name: string;
}

declare const SvgIcn: React.FC<SvgIcnProps>;

export default SvgIcn;
