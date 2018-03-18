function showAutoComplete(id)
{
    $(id).autocomplete({
        source: moment.tz.names(),
        minLength: 2,
        select: function (event, ui) {
          // console.log(ui.item ?
          //   "Selected: " + ui.item.value + " aka " + ui.item.id :
          //   "Nothing selected, input was " + this.value);
            ShowSnackBar("Added: " + ui.item.value);
        }
      });
}