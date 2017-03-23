import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';

/** Turn Dialog Components */
import DropAssistant from '../TurnDialogs/DropAssistant';
import MerchantEncounter from '../TurnDialogs/MerchantEncounter';
import PickUpAssistant from '../TurnDialogs/PickUpAssistant';
import SmugglerEncounter from '../TurnDialogs/SmugglerEncounter';

/** Location Components */
import BlackMarket from '../Location/BlackMarket';
import Caravansary from '../Location/Caravansary';
import FabricWarehouse from '../Location/FabricWarehouse';
import FruitWarehouse from '../Location/FruitWarehouse';
import GemstoneDealer from '../Location/GemstoneDealer';
import GreatMosque from '../Location/GreatMosque';
import LargeMarket from '../Location/LargeMarket';
import SmallMarket from '../Location/SmallMarket';
import SmallMosque from '../Location/SmallMosque';
import SpiceWarehouse from '../Location/SpiceWarehouse';
import TeaHouse from '../Location/TeaHouse';
import Wainwright from '../Location/Wainwright';


/** Modal Type Constants */
import { DROP_ASSISTANT, MERCHANT_ENCOUNTER, PICK_UP_ASSISTANT, SMUGGLER_ENCOUNTER } from './turn_dialog_types';
import { BLACK_MARKET, CARAVANSARY, FABRIC_WAREHOUSE, FRUIT_WAREHOUSE, GEMSTONE_DEALER, GREAT_MOSQUE, LARGE_MARKET, SMALL_MARKET, SMALL_MOSQUE, SPICE_WAREHOUSE, TEA_HOUSE, WAINWRIGHT } from './location_types';


const MODAL_COMPONENTS = {
    DROP_ASSISTANT: DropAssistant,
    MERCHANT_ENCOUNTER: MerchantEncounter,
    PICK_UP_ASSISTANT: PickUpAssistant,
    SMUGGLER_ENCOUNTER: SmugglerEncounter,
    BLACK_MARKET: BlackMarket,
    CARAVANSARY: Caravansary,
    FABRIC_WAREHOUSE: FabricWarehouse,
    FRUIT_WAREHOUSE: FruitWarehouse,
    GEMSTONE_DEALER: GemstoneDealer,
    GREAT_MOSQUE: GreatMosque,
    LARGE_MARKET: LargeMarket,
    SMALL_MARKET: SmallMarket,
    SMALL_MOSQUE: SmallMosque,
    SPICE_WAREHOUSE: SpiceWarehouse,
    TEA_HOUSE: TeaHouse,
    WAINWRIGHT: Wainwright
};

const ModalRootContainer = (props) => {
    if (!props.modalType) {
        return null;
    }

    const SpecificTurnDialog = MODAL_COMPONENTS[props.modalType];

    return <SpecificTurnDialog payload={props.payload} gamesRef={this.props.gamesRef} />;
};

const mapStateToProps = state => {
    return {
        gameId: state.game.id,
        userId: state.user.uid,
        modalType: state.modal.modalType,
        payload: state.modal.payload
    };
};

export default compose(
  firebaseConnect(({gameId}) => ([
    `games/${gameId}`,
    `games/${gameId}/merchants`
  ])),
  connect(mapStateToProps)
)(ModalRootContainer);
