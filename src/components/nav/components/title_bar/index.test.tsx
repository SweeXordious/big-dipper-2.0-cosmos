import React from 'react';
import renderer from 'react-test-renderer';
import { MockTheme } from '@tests/utils';
import TitleBar from '.';

// ==================================
// global setup
// ==================================
let component:renderer.ReactTestRenderer;

// ==================================
// mocks
// ==================================

const mockUseNavContext = {
  title: undefined,
  rawData: {
    price: 0,
    marketCap: 0,
    inflation: 0,
    communityPool: 0,
  },
  uiData: {
    price: '$0.00',
    marketCap: 'N/A',
    inflation: '0.00%',
    communityPool: '0',
  },
};

jest.mock('@src/components/nav/contexts/nav', () => ({
  useNavContext: () => mockUseNavContext,
}));

// ==================================
// unit tests
// ==================================
describe('screen: Nav/TitleBar', () => {
  beforeEach(() => {
    component = renderer.create(
      <MockTheme>
        <TitleBar />
      </MockTheme>,
    );
  });

  it('it renders', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('hook toggles correctly', () => {
    mockUseNavContext.title = 'Validators';
    component.update(
      <MockTheme>
        <TitleBar />
      </MockTheme>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

afterEach(() => {
  mockUseNavContext.title = undefined;
  jest.clearAllMocks();
});