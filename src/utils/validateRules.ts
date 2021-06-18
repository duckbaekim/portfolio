interface Rules {
  email: RulesProperty;
  password: RulesProperty;
  phone: RulesProperty;
  picture: RulesProperty;
  cert: RulesProperty;
  isEqual: RulesProperty;
  term: RulesProperty;
}
interface RulesProperty {
  rule: any;
  message: string;
}
const rules: Rules = {
  // 이메일
  email: {
    rule: (value: string): boolean => {
      if (!value) {
        return false;
      }
      const regexp = new RegExp(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
      );
      return regexp.test(value);
    },
    message: '이메일이 올바르지 않습니다.',
  },
  password: {
    // 영어, 숫자를 포함한 6-20자
    rule: (value: string): boolean => {
      if (!value) {
        return false;
      }
      const regexp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/);
      return regexp.test(value);
    },
    message: '비밀번호 형식을 확인해주세요.',
  },
  // 핸드폰
  phone: {
    rule: (value: string): boolean => {
      if (!value) {
        return false;
      }
      const regexp = new RegExp(/^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/);
      return regexp.test(
        value.replace(
          /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
          '$1-$2-$3',
        ),
      );
    },
    message: '올바른 전화번호를 입력해주세요.',
  },
  // 입력됐는지만 체크, 사진용
  picture: {
    rule: (v: any) => !!v,
    message: '사진이 등록되지 않았습니다.',
  },
  cert: {
    // 6자리 이상 숫자
    rule: (value: string): boolean => {
      if (!value) {
        return false;
      }
      const regexp = new RegExp(/[0-9]{6}/);
      return regexp.test(value);
    },
    message: '올바른 인증번호 6자리 숫자를 입력하세요.',
  },
  // 두 비밀번호 확인
  isEqual: {
    rule: (value: string, value2: string): boolean => {
      return value === value2;
    },
    message: '두 비밀번호가 다릅니다.',
  },
  term: {
    rule: (value: boolean) => value,
    message: '약관에 동의해주세요.',
  },
};

type Keys = keyof Rules;
export function getMessage(key: Keys): string {
  return rules[key].message;
}
export function getRule(key: Keys): any {
  return rules[key].rule;
}
export function validate(key: Keys, value: any): boolean {
  const validator = getRule(key);
  return validator(value);
}
export function validateAndGetMessage(
  key: Keys,
  value: any,
  value2?: any,
): string | null {
  const validator = getRule(key);
  const isValid = validator(value, value2);
  return isValid ? null : getMessage(key);
}
