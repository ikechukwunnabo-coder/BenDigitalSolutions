import { Alert, Badge, Button, Card, EmptyState, LoadingState, PageHeader, SelectField, TextAreaField, TextField } from '../components/ui';
describe('UI component exports', () => {
  it('exports shared Workflow 8 components', () => {
    expect([Alert,Badge,Button,Card,EmptyState,LoadingState,PageHeader,SelectField,TextAreaField,TextField].every((x) => typeof x === 'function')).toBe(true);
  });
});
