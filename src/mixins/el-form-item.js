function getPropByPath(obj, path, strict) {
  let tempObj = obj
  path = path.replace(/\[(\w+)\]/g, '.$1')
  path = path.replace(/^\./, '')

  let keyArr = path.split('.')
  let i = 0
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break
    let key = keyArr[i]
    if (key in tempObj) {
      tempObj = tempObj[key]
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!')
      }
      break
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  }
}

export default {
  props: {
    verify: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    getRules() {
      const result = this.getVerifyRules() || []

      if (result.length) {
        return result
      }

      let formRules = this.form.rules
      let selfRules = this.rules
      let requiredRule = this.required !== undefined
        ? { required: !!this.required }
        : []
      formRules = formRules ? getPropByPath(formRules, this.prop ||
        '').o[this.prop || ''] : []

      return [].concat(selfRules || formRules || []).concat(requiredRule)
    },
    getVerifyRules() {
      if (!this.verify.length) {
        return null
      }

      const result = []

      let label = this.label

      if (label[label.length - 1] === ':' || label[label.length - 1] === '：') {
        label = label.slice(0, -1)
      }

      this.verify.forEach(val => {
        if (val.length === 0) {
          return
        }
        const rule = factory(val, label).ruleGenerator()

        rule && result.push(rule)
      }, this)

      return result
    }
  }
}

/**
 * NotNull // 不能为空
 * Number // 必须为数字
 * Int // 必须为整数
 * DateTime=yyyy-MM-dd hh:mm:ss // 必须是日期时间，yyyy-mm-dd hh:mm:ss
 * Email // 必须是Email
 * ZipCode // 必须是邮政编码
 * CnTel // 必须是固定电话（010-55095236,0335-6229586）
 * CnPhone // 必须是手机号码（15011245852）
 * IDCardNo // 必须身份证号码
 * Length=3 // 长度等于3
 * Regex=\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3} // 必须符合正则表达式
 * */
class VerifyRule {
  constructor(label, message) {
    this.label = label
    this.message = message
  }

  ruleGenerator() {
    return null
  }

  validatorGenerator(regex, message) {
    return (rule, value, callback) => {
      if (!value || value === '') {
        callback()
        return
      }

      const isValid = regex.test(value)

      if (!isValid) {
        callback(new Error(message))
      } else {
        callback()
      }
    }
  }
}

class NotNullRule extends VerifyRule {
  constructor(label, message) {
    message = message || '请输入' + label
    super(label, message)
  }

  ruleGenerator() {
    return {
      required: true,
      message: this.message,
      trigger: 'blur change'
    }
  }
}

class RegexStaticRule extends VerifyRule {
  constructor(label, message, regExp) {
    super(label, message)
    this.regExp = regExp
  }

  ruleGenerator() {
    const validator = super.validatorGenerator(this.regExp, this.message)

    return {
      validator: validator,
      trigger: 'blur change'
    }
  }
}

class RegexRule extends VerifyRule {
  constructor(label, message, exp) {
    super(label, message)
    this.exp = exp
  }

  ruleGenerator() {
    let regExp
    try {
      regExp = new RegExp(this.exp)
    } catch (e) {
      console.error('正则表达式错误，' + e.toString())
      return null
    }

    const validator = super.validatorGenerator(regExp, this.message)

    return {
      validator: validator,
      trigger: 'blur change'
    }
  }
}

class LengthRule extends VerifyRule {
  constructor(label, message, size) {
    super(label, message)
    this.min = size.min
    this.max = size.max
  }

  ruleGenerator() {
    return {
      min: this.min,
      max: this.max,
      message: this.message,
      trigger: 'blur change'
    }
  }
}

class DateTimeRule extends VerifyRule {
  constructor(label, message, dateFormat) {
    super(label, message)
    this.dateFormat = dateFormat
  }

  ruleGenerator() {
    let regExp
    let exp = '^' + this.dateFormat + '$'

    exp = exp.replace('yyyy', '[0-9]{4}')
    exp = exp.replace('yy', '[0-9]{2}')
    exp = exp.replace('MM', '[0-9]{2}')
    exp = exp.replace('dd', '[0-9]{2}')
    exp = exp.replace('hh', '[0-9]{2}')
    exp = exp.replace('mm', '[0-9]{2}')
    exp = exp.replace('ss', '[0-9]{2}')

    try {
      regExp = new RegExp(exp)
    } catch (e) {
      console.error('正则表达式错误，' + e.toString())
      return null
    }

    const validator = super.validatorGenerator(regExp, this.message)

    return {
      validator: validator,
      trigger: 'blur change'
    }
  }
}

function parseParam(param) {
  let result = {
    value: '',
    message: null
  }

  if (param.indexOf('|') === -1) {
    result.value = param
    return result
  }

  const array = param.split('|')

  result.value = array[0]
  result.message = array[1]

  return result
}

function parseRegexParam(param) {
  let result = {
    value: '',
    message: null
  }

  if (param.indexOf('$|') === -1) {
    result.value = param
    return result
  }

  const array = param.split('$|')

  result.value = array[0] + '$'
  result.message = array[1]

  return result
}

function factory(type, label) {
  let param

  if (type.startsWith('NotNull')) {
    param = parseParam(type)
    return new NotNullRule(label, param.message)
  }

  if (type.startsWith('Number')) {
    param = parseParam(type)
    return new RegexStaticRule(label, param.message || label + '必须是数字', /(^-?\d+\.?\d+$)|(^-?\d+$)/)
  }

  if (type.startsWith('Int')) {
    param = parseParam(type)
    return new RegexStaticRule(label, param.message || label + '必须是整数', new RegExp('^-?\\d+$'))
  }

  if (type.startsWith('Email')) {
    param = parseParam(type)
    return new RegexStaticRule(label, param.message || label + '必须是email',
      /^([-a-zA-Z0-9_.])+@(([-a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})+$/)
  }

  if (type.startsWith('ZipCode')) {
    param = parseParam(type)
    return new RegexStaticRule(label, param.message || label + '必须是邮政编码', /^[1-9][0-9]{5}$/)
  }

  if (type.startsWith('CnTel')) {
    param = parseParam(type)
    return new RegexStaticRule(label, param.message || label + '必须是固定电话',
      /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/)
  }

  if (type.startsWith('CnPhone')) {
    param = parseParam(type)
    return new RegexStaticRule(label, param.message || label + '必须是手机号码', /^1[3-9]\d{9}$/)
  }

  if (type.startsWith('IDCardNo')) {
    param = parseParam(type)
    return new RegexStaticRule(label, param.message || label + '必须身份证号码', /(^\d{15}$)|(^\d{17}([0-9]|X)$)/)
  }

  if (type.startsWith('Regex=')) {
    const exp = type.split('=')
    param = parseRegexParam(exp[1])
    return new RegexRule(label, param.message || label + '必须符合正则表达式', param.value)
  }

  if (type.startsWith('Length=')) {
    const eqParams = type.split('=')
    param = parseParam(eqParams[1])
    return new LengthRule(label, param.message || label + '长度必须等于' + param.value, {
      min: parseInt(param.value),
      max: parseInt(param.value)
    })
  }

  if (type.startsWith('Length>')) {
    const gtParams = type.split('>')
    param = parseParam(gtParams[1])
    return new LengthRule(label, param.message || label + '长度必须大于' + param.value, {
      min: parseInt(param.value) + 1,
      max: null
    })
  }

  if (type.startsWith('Length<')) {
    const ltParams = type.split('<')
    param = parseParam(ltParams[1])
    return new LengthRule(label, param.message || label + '长度必须小于' + param.value, {
      min: null,
      max: parseInt(param.value) - 1
    })
  }

  if (type.startsWith('DateTime=')) {
    const dateFormat = type.split('=')
    param = parseParam(dateFormat[1])
    return new DateTimeRule(label, param.message || label + '必须是日期时间，' +
      param.value, param.value)
  }

  return null
}
