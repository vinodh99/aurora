import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Transition } from "react-transition-group";
import { Text } from "../Text";
import { variants, variantsIcons } from "./constants";
import {
  Container,
  Content,
  CloseButton,
  IconSection,
  ContentSection,
  CloseIcon,
  Link,
  BASE_BANNER_HEIGHT,
  MAX_BANNER_HEIGHT
} from "./Banner.styles";

class Banner extends Component {
  static propTypes = {
    isExpanded: PropTypes.bool,
    isOpen: PropTypes.bool.isRequired,
    heading: PropTypes.string.isRequired,
    content: PropTypes.string,
    href: PropTypes.string,
    linkText: PropTypes.string,
    expandedText: PropTypes.string,
    collapsedText: PropTypes.string,
    onButtonClick: PropTypes.func,
    onRequestClose: PropTypes.func,
    linkProps: PropTypes.shape(),
    buttonProps: PropTypes.shape(),
    style: PropTypes.shape(),
    variant: PropTypes.oneOf(variants),
    icon: PropTypes.node,
    closeButtonTitleText: PropTypes.string
  };

  static defaultProps = {
    isExpanded: false,
    content: "",
    href: "",
    linkText: "",
    expandedText: "",
    collapsedText: "",
    onButtonClick: null,
    onRequestClose: null,
    linkProps: {},
    buttonProps: {},
    style: {},
    variant: null,
    icon: null,
    closeButtonTitleText: "Close banner"
  };

  // Container max height should be handled programmatically as content height is unknown
  state = {
    isExpanded: this.props.isExpanded,
    maxHeight: this.props.isExpanded
      ? `${MAX_BANNER_HEIGHT}px` // max height if banner is expanded during first render
      : `${BASE_BANNER_HEIGHT}px`
  };

  componentDidMount() {
    // update max height to the correct value so animation works correctly
    if (this.props.content && this.state.isExpanded) {
      const maxHeight =
        this.text.current.offsetHeight +
        this.heading.current.offsetHeight +
        this.content.current.offsetHeight +
        32;

      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ maxHeight: `${maxHeight}px` });
    }
    if (!this.props.content && !this.props.isExpanded) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        maxHeight: `${this.text.current.offsetHeight +
          this.heading.current.offsetHeight +
          32}px`
      });
    }
  }

  content = React.createRef();

  heading = React.createRef();

  text = React.createRef();

  toggleContent = () => {
    const { onButtonClick } = this.props;
    const contentHeight = this.content.current.offsetHeight;
    const headingHeight = this.heading.current.offsetHeight;
    const textHeight = this.text.current.offsetHeight;
    const collapsedMaxHeight = `${textHeight + headingHeight + 32}px`;
    const expandedMaxHeight = `${contentHeight +
      headingHeight +
      textHeight +
      32}px`;

    this.setState(({ isExpanded }) => ({
      isExpanded: !isExpanded,
      maxHeight: isExpanded ? collapsedMaxHeight : expandedMaxHeight
    }));

    if (onButtonClick) {
      onButtonClick();
    }
  };

  renderControl = () => {
    const {
      href,
      linkText,
      expandedText,
      collapsedText,
      linkProps,
      buttonProps
    } = this.props;
    const { isExpanded } = this.state;
    if (!linkText && !expandedText && !collapsedText) {
      return null;
    }

    const props = href
      ? { ...linkProps, href }
      : { ...buttonProps, onClick: this.toggleContent };

    const text = linkText || (isExpanded ? expandedText : collapsedText);
    return (
      <Link size="hecto" {...props}>
        <div ref={this.text}>{text}</div>
      </Link>
    );
  };

  renderCloseButton = () => {
    const { onRequestClose, closeButtonTitleText } = this.props;
    if (!onRequestClose) {
      return null;
    }

    return (
      <CloseButton onClick={onRequestClose}>
        <CloseIcon size="small">
          <title>{closeButtonTitleText}</title>
        </CloseIcon>
      </CloseButton>
    );
  };

  renderIcon = () => {
    const { variant, icon } = this.props;
    if (!variant && !icon) {
      return null;
    }
    const Icon = variantsIcons[variant];

    return icon || <Icon type="filled" size="regular" />;
  };

  render() {
    const { isOpen, heading, content, variant, style } = this.props;
    const { isExpanded, maxHeight } = this.state;

    return (
      <Transition
        in={isOpen}
        timeout={isOpen ? 0 : 300} // allows to animate fade in after render correctly
        mountOnEnter
        unmountOnExit
      >
        {state => (
          <Container
            className={classnames({
              collapsed: !isExpanded,
              [`banner-variant-${variant}`]: variant,
              "visible-banner": state === "entered"
            })}
            style={{ ...style, maxHeight }}
          >
            <IconSection>{this.renderIcon()}</IconSection>
            <ContentSection>
              <Text tag="span" weight="semiBold">
                <div ref={this.heading}>{heading}</div>
              </Text>
              {this.renderControl()}
              <div ref={this.content}>
                <Content>{content}</Content>
              </div>
            </ContentSection>
            {this.renderCloseButton()}
          </Container>
        )}
      </Transition>
    );
  }
}

export default Banner;
