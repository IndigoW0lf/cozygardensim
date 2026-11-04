import React from 'react';
import { connect } from 'react-redux';

const MagicIndicator = ({ magicConditions }) => {
  return (
    <section aria-labelledby="magic-title">
      <h2 id="magic-title">Magic conditions</h2>
      <p>Moon Phase: {magicConditions.currentMoonPhase}</p>
      <p>
        Supernatural Events:{' '}
        {magicConditions.recentSupernaturalEvents ? 'Yes' : 'No'}
      </p>
    </section>
  );
};

const mapStateToProps = (state) => ({
  magicConditions: state.garden.magicConditions,
});

export default connect(mapStateToProps)(MagicIndicator);