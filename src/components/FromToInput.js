import React from "react";
import { Form, Icon, Input, Button, Row } from "antd";
import Graph from "../classes/Graph";

const convertMinutes = totalMinutes => {
  var hours = Math.floor(totalMinutes / 60);
  var minutes = totalMinutes % 60;

  return { hours, minutes };
};

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class FromToInput extends React.Component {
  constructor(props) {
    super(props);

    this.map = new Graph();

    this.map.addNode("CMB");
    this.map.addNode("DIA");
    this.map.addNode("DXU");

    this.map.addEdge("CMB", "DIA", 650);
    this.map.addEdge("DIA", "DXU", 707);
  }

  state = {
    from: "",
    to: "",
    result: null,
    errors: {}
  };

  validateInputs = () => {
    const { from, to } = this.state;
    let errors = {};
    if (!from) {
      errors.from = "From where is required!";
    }
    if (!to) {
      errors.to = "To where is required!";
    }
    this.setState({ errors });
    return errors;
  };

  handleFindRoute = () => {
    const { from, to } = this.state;
    const errors = this.validateInputs();
    const isValid = Object.keys(errors).length <= 0;
    if (isValid) {
      try {
        let result = this.map.findPathWithDijkstra(from, to);
        this.setState({ result });
        console.log(result);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { result, errors } = this.state;
    let hours = "";
    let minutes = "";
    if (result && result.time) {
      const hrsmins = convertMinutes(result.time);
      hours = hrsmins.hours;
      minutes = hrsmins.minutes;
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <>
        <Form
          {...formItemLayout}
          labelAlign="left"
          onSubmit={this.handleSubmit}
          className="from-to-form"
        >
          <Form.Item label="From Where">
            {getFieldDecorator("from", {
              rules: [{ required: true, message: "Please input from where!" }]
            })(<Input placeholder="Airport Code" />)}
          </Form.Item>
          <Form.Item label="To Where">
            {getFieldDecorator("to", {
              rules: [{ required: true, message: "Please input to where!" }]
            })(<Input placeholder="Airport Code" />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", right: 0 }}
            >
              Find Route
            </Button>
          </Form.Item>
        </Form>
        {/* <div className="from-to-input">
          <table>
            <tbody>
              <tr>
                <td>From Where: </td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter Airport Code"
                    value={this.state.from}
                    onChange={e => this.setState({ from: e.target.value })}
                  />
                </td>
                <td>To Where: </td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter Airport Code"
                    value={this.state.to}
                    onChange={e => this.setState({ to: e.target.value })}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <div className="error">
                    {errors && errors.from && errors.from}
                  </div>
                </td>
                <td></td>
                <td>
                  <div className="error">
                    {errors && errors.to && errors.to}
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="4" style={{ paddingTop: "20px" }}>
                  <button
                    className="button"
                    onClick={() => this.handleFindRoute()}
                  >
                    Find Route
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          Shortet Route :{" "}
          {result ? `${result.path}`.replace(/,/g, " => ") : "N/A"}
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          Time Duration : {result ? `${hours} hrs ${minutes} mins` : "N/A"}
        </div> */}
      </>
    );
  }
}

const WrappedFromToForm = Form.create({ name: "from_to" })(FromToInput);

export default WrappedFromToForm;
