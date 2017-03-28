import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import { dropAssistant } from '../../routes/move';
import { merchantsOnLocation } from '../../utils/assistants';
import { mapCoordToLocation } from '../../utils/board';

/** ------- Constants -------- */
import { MERCHANT_ENCOUNTER, ACTION } from '../Modal/turn_types';

class DropAssistant extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleAssistant = this.handleAssistant.bind(this);
  }

  handleAssistant() {
    const { userMoney, gameId, playerId, currentPosition, openModal, closeModal, merchants } = this.props;
    dropAssistant(gameId, playerId, currentPosition);
    closeModal();

    const otherMerchantsArray = merchantsOnLocation(playerId, currentPosition, merchants);
    // if other merchants are on this location, open the merchants dialog
    if (otherMerchantsArray.length) {
      openModal(mapCoordToLocation(currentPosition),
        {
          currentPosition: currentPosition,
          otherMerchants: otherMerchantsArray,
          merchantCount: otherMerchantsArray.length,
          money: userMoney,
          dialog: MERCHANT_ENCOUNTER // sends to handleMerchant()
        }
      );
    } else { // else, open the action dialog
      openModal(mapCoordToLocation(currentPosition), { currentPosition: currentPosition, dialog: ACTION });
    }
  }


  render() {
    const { handleEndTurn, payload } = this.props;
    return (
      <div id="turn-dialog-half">
        <RaisedButton
          label="Drop an assistant"
          style={{ margin: 12 }}
          primary={true}
          onTouchTap={this.handleAssistant}
          disabled={!payload.assistantCount}
        />
        <RaisedButton
          label="End turn now"
          style={{ margin: 12 }}
          secondary={true}
          onTouchTap={handleEndTurn}
        />
      </div>
    );
  }
};

export default DropAssistant;