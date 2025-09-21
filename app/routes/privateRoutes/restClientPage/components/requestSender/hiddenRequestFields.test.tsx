import { render, screen } from '@testing-library/react';
import { HiddenRequestFields } from './hiddenRequestFields';

describe('HiddenRequestFields', () => {
  const defaultProps = {
    url: 'https://example.com',
    method: 'POST',
    protocol: '',
    body: { test: true },
    headers: [{ id: 1, key: 'Content-Type', value: 'application/json' }],
    variables: [],
    requestDataJson: '{"url":"https://example.com"}',
  };

  it('renders hidden inputs for all fields', () => {
    render(
      <HiddenRequestFields
        {...defaultProps}
        requestDataJson={defaultProps.requestDataJson}
      />
    );

    expect(screen.getByDisplayValue(defaultProps.url)).toHaveAttribute(
      'type',
      'hidden'
    );
    expect(screen.getByDisplayValue(defaultProps.method)).toHaveAttribute(
      'type',
      'hidden'
    );
    expect(screen.getByDisplayValue(defaultProps.protocol)).toHaveAttribute(
      'type',
      'hidden'
    );

    expect(
      screen.getByDisplayValue(JSON.stringify(defaultProps.body))
    ).toHaveAttribute('type', 'hidden');

    expect(
      screen.getByDisplayValue(JSON.stringify(defaultProps.headers))
    ).toHaveAttribute('type', 'hidden');
    expect(
      screen.getByDisplayValue(JSON.stringify(defaultProps.variables))
    ).toHaveAttribute('type', 'hidden');

    expect(
      screen.getByDisplayValue(defaultProps.requestDataJson)
    ).toHaveAttribute('type', 'hidden');
  });
});
