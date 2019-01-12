import * as React from 'react'
import {
  ComponentFactory,
  ComponentFactorySource,
  create,
  CSSDeclaration,
} from '../src'

export type DressedComponentProps<
  Tag extends keyof JSX.IntrinsicElements,
  Props
> = JSX.IntrinsicElements[Tag] & {
  innerRef?: React.RefObject<any>
} & Props

export interface DreassedComponent<
  T extends keyof JSX.IntrinsicElements,
  Props
> extends React.ComponentClass<DressedComponentProps<T, Props>> {}

export type ReactDress = {
  [K in keyof JSX.IntrinsicElements]: <T>(
    ...decls: CSSDeclaration<T>[]
  ) => DreassedComponent<K, T>
}

const facctory: ComponentFactory = <T>({
  tag,
  render,
  componentId,
}: ComponentFactorySource): React.ComponentClass<T> => {
  return class extends React.Component<T> {
    static displayName = 'dress(' + tag + ')'
    static toString() {
      return '.' + componentId
    }
    props: any
    state = { classNames: [] }
    classNames: string[] = []
    constructor(props: any) {
      super(props)
      this.classNames = render(props)
    }
    getSnapshotBeforeUpdate() {
      this.classNames = render(this.props)
      return null
    }
    componentDidUpdate() {
      /* noop */
    }
    render() {
      const { innerRef, ...rest } = this.props
      const className = [this.props.className, componentId, ...this.classNames]
        .filter(Boolean)
        .join(' ')
      const props = { ...rest, className, ref: innerRef }
      return React.createElement(tag, props, this.props.children)
    }
  }
}

const { dress, keyframes, cssText, csx } = create<ReactDress>(facctory)
export { dress, csx, keyframes, cssText }
