import { shallow } from 'enzyme';
import Stream from './presenter';

describe('Stream', () => {
  const props = {
    tracks: [{ origin: { title: 'x' } }, { origin: { title: 'y' } }],
  };

  it('shows two elements', () => {
    const element = shallow(<Stream { ...props } />);

    expect(element.find('.track')).to.have.length(2);
  });
});
