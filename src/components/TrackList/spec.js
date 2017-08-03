import { shallow } from 'enzyme';
import TrackList from './presenter';

describe('TrackList', () => {
  const props = {
    tracks: [{ origin: { title: 'x' } }, { origin: { title: 'y' } }],
  };

  it('shows two elements', () => {
    const element = shallow(<TrackList {...props} />);

    expect(element.find('.track')).to.have.length(2);
  });
});
