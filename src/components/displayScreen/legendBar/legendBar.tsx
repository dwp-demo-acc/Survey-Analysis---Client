import React from 'react';
import Labels from '@/utils/labels';

// Define color constants
const NEGATIVE_COLOR: string = 'rgb(194,61,61)';
const POSITIVE_COLOR: string = 'rgb(87,210,159)';
const VERY_LOW_COLOR: string = 'rgb(160,220,255)';
const LOW_COLOR: string = 'rgb(98,181,229)';
const MODERATELY_LOW_COLOR: string = 'rgb(0,163,224)';
const MODERATE_COLOR: string = 'rgb(0,118,168)';
const MODERATELY_HIGH_COLOR: string = 'rgb(0,85,135)';
const HIGH_COLOR: string = 'rgb(2, 47, 151)';
const VERY_HIGH_COLOR: string = 'rgb(4,30,66)';



const LegendBar: React.FC<{ legend: string }> = ({ legend }) => {

  let scaleVerbalList: { [key: string]: string } = {};

  if (legend === Labels.fullLegend) {
    scaleVerbalList = {
      'Very Low': VERY_LOW_COLOR,
      'Low': LOW_COLOR,
      'Moderately Low': MODERATELY_LOW_COLOR,
      'Moderate': MODERATE_COLOR,
      'Moderately High': MODERATELY_HIGH_COLOR,
      'High': HIGH_COLOR,
      'Very High': VERY_HIGH_COLOR
    };
  } else if (legend === Labels.regularLegend) {
    scaleVerbalList = {
      'Very Low': VERY_LOW_COLOR,
      'Low': LOW_COLOR,
      'Moderate': MODERATE_COLOR,
      'High': HIGH_COLOR,
      'Very High': VERY_HIGH_COLOR,
    };
  } else if (legend === Labels.sentimentLegend) {
    scaleVerbalList = {
      'Negative': NEGATIVE_COLOR,
      'Positive': POSITIVE_COLOR,
    };
  }

  // Generate legend bar items
  const legendBarItems: JSX.Element[] = Object.entries(scaleVerbalList).map(([text, color]) => (
    <div key={text} style={{display:'flex',justifyContent:'center'}}>
      <div style={{ backgroundColor: color, height: '1rem', width: '1rem', display: 'inline-block' }} />
      <div style={{ display: 'inline-block', paddingLeft: '0.25rem', paddingRight: '0.75rem', fontSize: '0.75rem', fontWeight: '500' }}>
        {text}
      </div>
    </div>
  ));

  // Return legend bar JSX
  return (
    <div id="legend-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
      {legendBarItems}
    </div>
  );
};

export default LegendBar;
