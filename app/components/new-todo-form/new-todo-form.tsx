import * as React from "react";
import { NewTodoFormProps } from "./new-todo-form.props";
import { View, ViewStyle, TextInput, TextStyle } from "react-native";
import SubHeading from "../sub-heading/sub-heading";
import { useState } from "react";
import { color, spacing } from "../../theme";
import { connect } from "react-redux";
import { startAddTodo } from "../../actions/todos/todos";
import { TodoData } from "../../actions/todos/types";
import SubmitButton from "../submit-button/submit-button";

const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[5],
};

const ADD_TODO_FORM: ViewStyle = {
  flexDirection: "row",
  paddingBottom: spacing[3],
};

const INPUT: TextStyle = {
  flex: 1,
  backgroundColor: color.secondaryBackground,
  fontSize: spacing[5],
  marginVertical: spacing[1],
  paddingHorizontal: spacing[3],
  height: 50,
  borderRadius: 15,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.09,
  shadowRadius: 2.65,
  elevation: 4,
};

const NewTodoForm: React.FC<NewTodoFormProps> = props => {
  const [description, setDescription] = useState<string>("");

  function handleSubmitTodo(type: "work" | "personal") {
    props.addTodo({
      description: description,
      isCompleted: false,
      type,
    });
    setDescription("");
  }

  return (
    <View style={[CONTAINER, props.style]}>
      <SubHeading text="ADD NEW TASK" />
      <View style={ADD_TODO_FORM}>
        <TextInput
          style={INPUT}
          value={description}
          onChangeText={setDescription}
        />
        <SubmitButton
          color={color.primary}
          disabled={!description}
          handleClick={() => handleSubmitTodo("personal")}
        />
        <SubmitButton
          color={color.secondaryPrimary}
          disabled={!description}
          handleClick={() => handleSubmitTodo("work")}
        />
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  addTodo: (todo: TodoData) => dispatch(startAddTodo(todo)),
});

export default connect(undefined, mapDispatchToProps)(NewTodoForm);
