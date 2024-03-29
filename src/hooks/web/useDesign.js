import variables from '@/styles/variables.scss'

export const useDesign = () => {
  const scssVariables = variables

  /**
   * @param scope 类名
   * @returns 返回空间名-类名
   */
  const getPrefixCls = (scope) => {
    return `${scssVariables.namespace}-${scope}`
  }

  return {
    variables: scssVariables,
    getPrefixCls
  }
}
