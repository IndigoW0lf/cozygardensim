import React from 'react';
import { connect } from 'react-redux';

const MagicIndicator = ({ magicConditions }) => {
  return (
    <div>
      <h4>Magic Conditions</h4>
      <p>Moon Phase: {magicConditions.currentMoonPhase}</p>
      <p>
        Supernatural Events:{' '}
        {magicConditions.recentSupernaturalEvents ? 'Yes' : 'No'}
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  magicConditions: state.garden.magicConditions,
});

export default connect(mapStateToProps)(MagicIndicator);