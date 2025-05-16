import type { Flatfile } from '@flatfile/api'

export const constraints: Omit<Flatfile.ConstraintCreate, 'appId'>[] = [
  {
    label: 'ID Format Validation',
    validator: 'id-format-validator',
    description:
      'Create a validation rule for the ID field that checks if the value starts with correct prefix followed by numbers only. The rule should return an error message if either condition is not met.',
    function: `function constraint(value, key, { record, sheet, config }) {
  // Skip validation if value is empty or null
  if (!value) {
    return;
  }

  const idPrefix = config.idPrefix
  if (!new RegExp(\`^\${idPrefix}\\\\d+$\`).test(value)) {
    record.addError(key, \`Invalid ID. IDs must start with "\${idPrefix}".\`)
  }
}`,
  },
]
