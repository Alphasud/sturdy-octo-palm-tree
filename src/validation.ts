export interface Status {
  valid: boolean
  message?: string
}

type Rule = (value: string) => Status

export function length({ min, max }: { min?: number; max?: number }): Rule {
  return (value: string): Status => {
    const result =
      value.length >= (min || 0) && value.length <= (max || Infinity)
    return {
      valid: result,
      message: result
        ? undefined
        : `Must be between ${min} and ${max} characters`,
    }
  }
}

export const required: Rule = (value: string): Status => {
  const result = Boolean(value)
  return {
    valid: result,
    message: result ? undefined : "Required",
  }
}

export function validate(value: string, rules: Rule[]): Status {
  for (const rule of rules) {
    const result = rule(value)
    if (!result.valid) {
      return result
    }
  }
  return {
    valid: true,
  }
}
